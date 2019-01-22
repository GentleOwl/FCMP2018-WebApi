const localStorage = require('localStorage');

class NewsService {
    constructor() {
        const news = [
            { id: 1, description: 'News 1' },
            { id: 2, description: 'News 2' },
            { id: 3, description: 'News 3' },
            { id: 4, description: 'News 4' },
            { id: 5, description: 'News 5' },
            { id: 6, description: 'News 6' },
            { id: 7, description: 'News 7' },
            { id: 8, description: 'News 8' },
            { id: 9, description: 'News 9' },
            { id: 10, description: 'News 10' },
        ];

        this.setNewsInStorage(news);
        localStorage.setItem('newsId', 11);
    }

    getNews() {
        return this.getNewsFromStorage();
    }

    getNewsById(newsId) {
        return this.getNewsFromStorage().find(o => o.id === newsId);
    }

    deleteNews(newsId) {
        const news = this.getNewsFromStorage();
        const index = news.findIndex(o => o.id === newsId);
        if (index < 0) {
            return;
        }

        news.splice(index, 1);
        this.setNewsInStorage(news);
    }

    updateNews(newsItem) {
        if (!newsItem) {
            return null;
        }

        const news = this.getNewsFromStorage();
        const index = news.findIndex(o => o.id === newsItem.id);
        if (index < 0) {
            return null;
        }

        news.splice(index, 1, newsItem);
        this.setNewsInStorage(news);

        return newsItem;
    }

    addNews(newsItem) {
        if (!newsItem) {
            return null;
        }

        const news = this.getNewsFromStorage();
        newsItem.id = this.getNextNewsId();

        news.push(newsItem);
        this.setNewsInStorage(news);

        return newsItem;
    }

    getNewsFromStorage() {
        return JSON.parse(localStorage.getItem('news'));
    }

    setNewsInStorage(news) {
        localStorage.setItem('news', JSON.stringify(news));
    }

    getNextNewsId() {
        const nextId = +localStorage.getItem('newsId');
        localStorage.setItem('newsId', nextId + 1);
        return nextId;
    }
}

module.exports = new NewsService();