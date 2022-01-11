// Set up express
const express = require('express');
const app = express();

// Set up urlencoded parser
app.use(express.urlencoded({extended: true}));

// Set up public folder
app.use(express.static('public'));

// Set up ejs
app.set('view engine', 'ejs');

// Set up lodash
const _ = require('lodash');

const characterLimit = 300;

let title = "Hello!";

// Home
let hello = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, mollitia.";
let articles = [];

// About
let about = "This is what it's all about.";

// Archives
let archives = "We're not the Magistrate, but we do have archives."

// Contact
let contact = "Call me beep me.";

// Home
app.get("/", function(req, res) {
    res.render('index', {title: title, content: hello, articles: articles});
})

app.post("/", function(req, res) {

    const newArticle = {
        articleTitle: req.body.composeTitle,
        articleText: req.body.composeText
    }

    articles.unshift(newArticle);

    res.render('compose', {title: "Compose"});
})

// Read
app.get("/read", function(req, res) {
    res.redirect("/");
})

app.get("/read/:articleIndex", function(req, res){

    let parameter = req.params.articleIndex;

    // Search by Title
    articles.forEach(function(article) {
        if(_.lowerCase(article.articleTitle) === _.lowerCase(parameter)) {
            res.render('article', {title: article.articleTitle, articleTitle: article.articleTitle, articleText: article.articleText});
        }
    })

    // Search by Index
    if(articles.length > parameter)
        res.render('article', {title: articles[parameter].articleTitle, articleTitle: articles[parameter].articleTitle, articleText: articles[parameter].articleText});
    else
        res.render('article', {title: "404", articleTitle: "Article Not Found", articleText: "Requested article does not exist."});
})

/*
// About
app.get("/about", function(req, res) {
    res.render('index', {title: "About", content: about});
})

// Archives
app.get("/archives", function(req, res) {
    res.render('index', {title: "Archives", content: archives});
})

// Contact
app.get("/contact", function(req, res) {
    res.render('index', {title: "Contact", content: contact});
})
*/

// Compose
app.get("/compose", function(req, res) {
    res.render('compose', {title: "Compose"});
})

// Listen at port 3000
const port = 3000;

app.listen(port, function() {
    console.log("Server is running on port " + port);
})