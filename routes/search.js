const express = require('express')
const router = express.Router()

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('52eaed2966f4438aad1b0e0c44743c12');

const getTopHeadlines = async (query) => {
    const response = await newsapi.v2.topHeadlines({
        q: query,
        language: 'en',
        country: 'in'
    });
    return response;
}

router.get('/:query', async (req, res) => {
    const top_headlines = await getTopHeadlines(req.params.query.toLowerCase())
    const articles = top_headlines.articles

    let top;
    if (articles.length > 12) {
        top = top_headlines.articles.slice(0, 12)
    } else {
        top = articles
    }

    top = top.map((element) => {
        return { ...element, publishedAt: element.publishedAt.slice(0, 10)}
    })

    res.render('home', {
        headlines: top
    })
})

module.exports = router