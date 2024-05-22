const express = require('express')
const router = express.Router()

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('52eaed2966f4438aad1b0e0c44743c12');

const getTopHeadlines = async (category) => {
    const response = await newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        country: 'in'
    });
    return response;
}

router.get('/:category', async (req, res) => {
    const top_headlines = await getTopHeadlines(req.params.category)
    let top12 = top_headlines.articles.slice(0, 12)

    top12 = top12.map((element) => {
        return { ...element, publishedAt: element.publishedAt.slice(0, 10)}
    })

    res.render('home', {
        headlines: top12
    })
})

module.exports = router