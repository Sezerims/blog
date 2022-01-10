// Set up express
const express = require('express');
const app = express();

// Set up urlencoded parser
app.use(express.urlencoded({extended: true}));

// Set up public folder
app.use(express.static('public'));

// Set up ejs
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render('index');
})

// Listen at port 3000
const port = 3000;

app.listen(port, function() {
    console.log("Server is running on port " + port);
})