const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const {addTeam} = require('./serverFiles/addTeam');
const {checkTeam} = require('./serverFiles/checkTeam');
const {getAllTeams} = require('./serverFiles/getAllTeams');
const {getDone} = require('./serverFiles/getDone');
const {getTeam} = require('./serverFiles/getTeam');
const {deleteAll} = require('./serverFiles/deleteAll');
const {putMarks} = require('./serverFiles/putMarks');
const {addRevTeam} = require('./serverFiles/addrevTeam');
const {getRevTeams} = require('./serverFiles/getRevTeam');
const {countRev} = require('./serverFiles/countPart');
const {checkRev} = require('./serverFiles/checkExistRev');

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

app.get('/getAll', (req, res) => {

    getAllTeams((err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }

        res.send(result);
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

app.get('/getDone/:judge', (req, res) => {
    getDone(req.params.judge, (err, result) => {
        if (err) {
            res.send(err);
        }
        // res.send(result);
        res.render('index.hbs', result);
    });
});

app.get('/deleteAll', (req, res) => {
    deleteAll((err) => {
        if (err) {
            res.send(err);
        }

        res.send('<h1>Deleted!</h1>');
    })
});

app.get('/teamRevNum/:team', (req, res) => {
    var team = req.params.team;
    checkRev(team, (err, resp) => {
        res.send(resp);
    });
});

/* ===== End of user based temprary route ===== */

app.get('/', (req, res) => {
    res.render('choose.hbs', {done: true});
}); 

app.get('/fetchRevTeams', (req, res) => {
    getRevTeams((err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        countRev((err, count) => {
            if(err) {
                res.render('404.hbs');
            }

            res.render('getRev.hbs', {
                data: result,
                count
            });
        });
        
    });
});

app.post('/addRevTeam/:teams', (req, res) => {
    var teamNum = req.params.teams;
    var teamDet = {
        teamNum: teamNum,
        participant: req.body.participant,
        email: req.body.email,
        productName: req.body.productName,
        teamName: req.body.teamName,
        description: req.body.description,
        links: req.body.links
    }
    addRevTeam(teamDet, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

        res.send(result);
    });
});

app.post('/addTeam/:teams', (req, res) => {
    var teamNum = req.params.teams;
    var teamDet = {
        teamNum: teamNum,
        participant: req.body.participant,
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
    var judge = req.params.judge;
    getDone(judge, (err, result) => {
        if (err) {
            res.send(err);
        }
        // res.send(result);
        console.log('Result Done: ', result);
        result.judge = judge;
        // res.send(result);
        res.render('index.hbs', result);
    });
});

app.post('/:judge/review/:team', (req, res) => {
    var team = req.params.team;
    var judge = req.params.judge;

    getTeam(team, (err, result) => {
        if (err) {
            return res.send(err);
        }

        console.log(result);
        result[0].judge = judge;
        // res.send(result[0]);
        res.render('review.hbs', result[0]);
    });

});

app.post('/:judge/save/:team', (req, res) => {
    var judge = req.params.judge;
    var team = req.params.team;
    var marks = parseInt(req.body.marks1) + parseInt(req.body.marks2) + parseInt(req.body.marks3);
    var comments = req.body.comments;
    var upData = {
        marks, team, comments
    };
    putMarks(upData, judge, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.render('submit.hbs', {judge});
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