const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tattooRoutes = require('./routes/tattoos');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

app.use('/tattoos', tattooRoutes);

app.listen(3000, () => {
  console.log('🎉 Tattoo API running on port 3000');
});