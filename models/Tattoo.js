const mongoose = require('mongoose');

const TattooSchema = new mongoose.Schema({
  title: String,
  artistName: String,
  imageUrl: String,
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tattoo', TattooSchema);