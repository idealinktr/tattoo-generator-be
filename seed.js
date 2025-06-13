// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Tattoo = require('./models/Tattoo');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Tattoo.deleteMany();

  await Tattoo.insertMany([
    {
      title: "🐺 Wolf Tattoo",
      artistName: "AliceTattoos",
      imageUrl: "https://cdn.tattooapp.com/images/wolf1.png",
      likeCount: 45,
    },
    {
      title: "🌙 Moon Dagger",
      artistName: "needlequeen",
      imageUrl: "https://cdn.tattooapp.com/images/moon1.png",
      likeCount: 128,
    },
    {
      title: "🦋 Butterfly",
      artistName: "InkMaster",
      imageUrl: "https://cdn.tattooapp.com/images/butterfly1.png",
      likeCount: 75,
    }
  ]);

  console.log('✅ Seed tamamlandı!');
  process.exit();
});