const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

/* =========================================== */
/* ===== Temprary route for dev purposes ===== */
/* =========================================== */

app.get('/card', (req, res) => {
    res.render('card.hbs', {done: true});
});

app.get('/review', (req, res) => {
    res.render('review.hbs', {
        team: '1'
    });
});

app.get('/submit', (req, res) => {
    res.render('submit.hbs');
});

/* ===== End of user based temprary route ===== */

app.get('/', (req, res) => {
    res.render('index.hbs', {done: true});
}); 

app.post('/review/:team', (req, res) => {
    var team = req.params.team;
    
    res.render('review.hbs', {
        team: team,
        name1: 'Snoop Dogg',
        name2: 'Hitler',
        name3: 'Random?'
    });

});

app.post('/save/:team', (req, res) => {
    res.render('submit.hbs');
});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})