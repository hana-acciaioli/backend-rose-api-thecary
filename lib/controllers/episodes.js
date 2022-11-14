const { Router } = require('express');

const { Episode } = require('../models/Episode.js');

module.exports = Router().get('/', async (req, res) => {
  const episodes = await Episode.getAll();
  res.json(episodes);
});
