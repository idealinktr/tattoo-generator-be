const axios = require('axios');
const Tattoo = require('../models/Tattoo');

exports.getExploreTattoos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const tattoos = await Tattoo.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const data = tattoos.map(t => ({
      tattooId: t._id,
      imageUrl: t.imageUrl,
      title: t.title,
      artistName: t.artistName,
      likeCount: t.likeCount,
      isLiked: false // Auth sonrası dinamik yapılabilir
    }));

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.generateTattoo = async (req, res) => {
  const { prompt, artistName = "AI Generator" } = req.body;

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: '4bc1533722f56e5e67505e4e968cc52d21712d11abe041467173e997c1339fe4',
        input: { prompt },
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const prediction = response.data;

    // Henüz image hazır değil, sadece prediction ID'si kaydedelim (isteğe bağlı)
    await Tattoo.create({
      title: prompt,
      artistName,
      imageUrl: "", // image hazır değil, get-prediction ile güncellenebilir
      likeCount: 0,
    });

    res.status(200).json({
      predictionId: prediction.id,
      status: prediction.status,
    });

  } catch (err) {
    console.error('❌ Error generating tattoo:', err.message);
    res.status(500).json({ error: 'Tattoo generation failed.' });
  }
};

exports.getPredictionStatus = async (req, res) => {
  const predictionId = req.params.id;

  try {
    const response = await axios.get(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const prediction = response.data;

    // Eğer generation tamamlandıysa ve image URL geldiyse DB'ye yazabiliriz
    if (prediction.status === "succeeded" && prediction.output?.[0]) {
      await Tattoo.findOneAndUpdate(
        { title: prediction.input.prompt },
        { imageUrl: prediction.output[0] }
      );
    }

    res.json(prediction);

  } catch (err) {
    console.error('❌ Error checking prediction:', err.message);
    res.status(500).json({ error: 'Failed to check prediction status' });
  }
};