const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile(__dirname + '/log/server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});
/*Maintenance mode can be triggered by uncommenting below piece of code*/
// app.use((req,res,next) => {
//    res.render('maintenance.hbs', {
//        pageTitle: "Maintenance Page",
//        welcomePage: "Under construction, We'll be back soon!"
//    });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// hbs.formHelpers.namespace('accountForm');
//hbs.registerformHelpers.register('accountForm');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our little website'
    });
});

app.get('/signup',(req, res) => {
    res.render('signup.hbs', {
        pageTitle: 'Account Creation Page'
    });

});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.post('/success',(req, res) => {
    res.render('success.hbs', {
        pageTitle: 'Thank you for signing up!',
        welcomeMessage: 'Thank you for signing up for our little website'
    });

});

app.get('/about',(req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });

});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.',
    });

});

app.listen(port, () => {
 console.log(`Server is up on port ${port}`);
});