const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const {addTeam} = require('./serverFiles/addTeam');
const {checkTeam} = require('./serverFiles/checkTeam');

const port = process.env.PORT || 8000;

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

app.get('/teamNum/:team', (req, res) => {
    checkTeam(req.params.team, (result) => {
        res.send(result);
    });
});

/* ===== End of user based temprary route ===== */

app.get('/', (req, res) => {
    res.render('choose.hbs', {done: true});
}); 

app.post('/addTeam/:teams', (req, res) => {
    var teamNum = req.params.teams;
    var teamDet = {
        teamNum: teamNum,
        name: req.body.name,
        rollNo: req.body.rollno,
        email: req.body.email,
        productName: req.body.productName,
        teamName: req.body.teamName,
        description: req.body.description,
        links: req.body.links
    }
    addTeam(teamDet, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

        res.send(result);
    });
});

app.get('/:judge', (req, res) => {
    res.render('index.hbs', {
        done1: false,
        done2: true,
        done3: false,
        done4: false,
        done5: true,
        done6: true,
        done7: true,
        done8: true,
        done9: true,
        done10: true,
        done11: true,
        done12: true,
        done13: true,
        done14: true,
        done15: true,
        done16: true,
        done17: true,
        done18: true,
        done19: true,
        done20: false
    });
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

app.get('/:judge/review/:team', (req, res) => {
    var judge = req.params.judge;
    var team = req.params.team;
    // res.send(judge);
});

app.post('/:judge/submit/:team', (req, res) => {
    var judge = req.params.judge;
    var team = req.params.team;
    var marks = req.body.marks1 + req.body.marks2 + req.body.marks3;

});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})