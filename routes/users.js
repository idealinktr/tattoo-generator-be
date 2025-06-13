const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/create-or-get', async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid });
      console.log("🆕 New user created:", uid);
    } else {
      console.log("✅ Existing user found:", uid);
    }

    res.json({
      success: true,
      data: {
        uid: user.uid,
        isPremium: user.isPremium,
        likedTattooIds: user.likedTattooIds,
        createdAt: user.createdAt,
      }
    });
  } catch (err) {
    console.error("❌ Error in create-or-get:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;