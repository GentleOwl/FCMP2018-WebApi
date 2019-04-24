const express = require('express');
const newsService = require('../services/news-service');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const newsItems = await newsService.getNews();

  res.json(newsItems);
});

router.get('/:id', async (req, res, next) => {
  const newsItem = await newsService.getNewsById(req.params.id);

  res.json(newsItem);
});

router.delete('/:id', function(req, res, next) {
  res.json(newsService.deleteNews(req.params.id));
});

router.put('/', async (req, res, next) => {
  const newsItem = await newsService.addNews(req.body)

  res.json(newsItem);
});

router.post('/:id', async (req, res, next) => {
  const newsItem = await newsService.updateNews(req.params.id, req.body)

  res.json(newsItem);
});

module.exports = router;
