const express = require('express');
const newsService = require('../services/news-service');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(newsService.getNews());
});

router.get('/:id', function(req, res, next) {
  res.json(newsService.getNewsById(+req.params.id));
});

router.delete('/:id', function(req, res, next) {
  res.json(newsService.deleteNews(+req.params.id));
});

router.put('/', function(req, res, next) {
  res.json(newsService.addNews(req.body));
});

router.post('/', function(req, res, next) {
  res.json(newsService.updateNews(req.body));
});

module.exports = router;
