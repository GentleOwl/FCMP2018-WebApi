var NewsItem = require('../models/news-item');

class NewsService {
    constructor() {
    }

    async getNews() {
        return await NewsItem.find({});
    }

    async getNewsById(newsItemId) {
        return await NewsItem.findById(newsItemId);
    }

    async deleteNews(newsItemId) {
        await NewsItem.findOneAndRemove({ _id: newsItemId });
    }

    async updateNews(newsItemId, newsItem) {
        return await NewsItem.findOneAndUpdate({ _id: newsItemId }, newsItem, { new: true });
    }

    async addNews(newsItem) {
        return await NewsItem.create(newsItem);
    }
}

module.exports = new NewsService();