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