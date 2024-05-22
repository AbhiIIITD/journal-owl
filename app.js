const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require(path.join(__dirname, 'routes/home.js')))
app.use('/about', require(path.join(__dirname, 'routes/about.js')))
app.use('/genre', require(path.join(__dirname, 'routes/genre.js')))
app.use('/search', require(path.join(__dirname, 'routes/search.js')))

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})