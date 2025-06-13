const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-tattoo', async (req, res) => {
  const { prompt } = req.body;

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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-prediction/:id', async (req, res) => {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🎉 Tattoo API running on port 3000');
});