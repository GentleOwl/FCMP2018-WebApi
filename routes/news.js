const express = require('express');
const newsService = require('../services/news-service');
const auth = require('./auth');
const router = express.Router();

router.get('/', auth.optional, async (req, res, next) => {
  const newsItems = await newsService.getNews();

  res.json(newsItems);
});

router.get('/:id', auth.optional, async (req, res, next) => {
  const newsItem = await newsService.getNewsById(req.params.id);

  res.json(newsItem);
});

router.delete('/:id', auth.required, function(req, res, next) {
  res.json(newsService.deleteNews(req.params.id));
});

router.put('/', auth.required, async (req, res, next) => {
  const newsItem = await newsService.addNews(req.body)

  res.json(newsItem);
});

router.post('/:id', auth.required, async (req, res, next) => {
  const newsItem = await newsService.updateNews(req.params.id, req.body)

  res.json(newsItem);
});

module.exports = router;
