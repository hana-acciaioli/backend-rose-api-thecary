const { Router } = require('express');
const { Quote } = require('../models/Quote.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const quoteNew = await Quote.insert(req.body);
      res.json(quoteNew);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const quotes = await Quote.getAll(req.body);
      res.json(quotes);
    } catch (e) {
      next(e);
    }
  });
