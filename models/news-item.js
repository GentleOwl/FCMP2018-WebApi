var mongoose = require('mongoose');

var NewsItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('NewsItem', NewsItemSchema);