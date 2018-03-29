const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');
var _ = require('lodash');

const {addTeam} = require('./serverFiles/addTeam');
const {checkTeam} = require('./serverFiles/checkTeam');
const {getAllTeams} = require('./serverFiles/getAllTeams');
const {getDone} = require('./serverFiles/getDone');
const {getTeam} = require('./serverFiles/getTeam');
const {deleteAll} = require('./serverFiles/deleteAll');
const {deleteAllRev} = require('./serverFiles/deleteAllRev');
const {putMarks} = require('./serverFiles/putMarks');
const {addRevTeam} = require('./serverFiles/addrevTeam');
const {getRevTeams} = require('./serverFiles/getRevTeam');
const {getRevDone} = require('./serverFiles/getRevDone');
const {countRev} = require('./serverFiles/countPart');
const {checkRev} = require('./serverFiles/checkExistRev');
const {addRoundTeam} = require('./serverFiles/addRoundTeam');
const {checkR2} = require('./serverFiles/checkExistRound');
const {countRound} = require('./serverFiles/countRound');
const {getRoundDone} = require('./serverFiles/getRoundDone');
const {getRevSelected} = require('./serverFiles/getRevSelected');
const {putRound1} = require('./serverFiles/putRound1');
const {putRound2} = require('./serverFiles/putRound2');
const {checkR1} = require('./serverFiles/checkDoneRev');
const {checkRF} = require('./serverFiles/checkDoneFinal');
const {countFinal} = require('./serverFiles/countFinal');
const {getRoundSelected} = require('./serverFiles/getRoundSelected');
const {getTheFinalDone} = require('./serverFiles/getFinalDone');

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

app.get('/putRound/:team', (req, res) => {
    putRound1(req.params.team, (err, result) => {
        res.send(result);
    });
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
    checkRev(team, (team) => {
        res.send(team);
    });
});

app.get('/deleteAllRev', (req, res) => {
    deleteAllRev((err) => {
        if (err) {
            res.send(err);
        }

        res.send('<h1>Deleted!</h1>');
    })
});

app.get('/deleteAllRound', (req, res) => {
    deleteAllRound((err) => {
        if (err) {
            res.send(err);
        }

        res.send('<h1>Deleted!</h1>');
    })
});
/* ===== End of user based temprary route ===== */

app.get('/', (req, res) => {
    res.render('choose.hbs', {done: true});
}); 

app.get('/fetchRevTeams', (req, res) => {
    getRevDone((err, result) => {
        if (err) {
            res.send(err);
        }
        // res.send(result);
        console.log('Result Done: ', result);
        // res.send(result);

        countRev((err, count) => {
            if(err) {
                res.render('404.hbs');
            }
            var finalDone = {
                data: result,
                count
            }
            // res.send(finalDone);
            res.render('getRev.hbs', finalDone);
        });
    });

});

app.post('/saveForR2/:team', (req, res) => {
    var team = req.params.team;
    comments = req.body.comments;
    countRound((err, count) => {
        if(err) {
            res.render('404.hbs');
        }

        var teamNum = count + 1;
        getRevSelected(team, (err, resp) => {
            if (err) {
                return res.render('404.hbs');
            }
            console.log(teamNum);
            resp[0].teamNum = teamNum;
            const finalObj = {
                reviewOne : resp[0].reviewOne,
                participant : resp[0].participant,
                done : resp[0].done,
                teamNum : resp[0].teamNum,
                email : resp[0].email,
                productName : resp[0].productName,
                teamName : resp[0].teamName,
                description : resp[0].description,
                comments: comments
            }
            checkR1(team, (teamExist) => {
                if (teamExist === true) {
                    res.send('This team number is already in use!');
                }
                else {
                    
                    
                    // finalObj = _.pickBy(finalObj, (val, key) => key !== '__v');
                    
                    // res.send(finalObj);
                    
                    addRoundTeam(finalObj, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send(err);
                        }
                        putRound1(team, (err, modDoc) => {
                            console.log(modDoc);    
                            res.render('goBack.hbs', {result});
                        })
                        
                    });
                }
                
            });
        });
        
        // res.send(finalDone);
        // res.render('getRev.hbs', finalDone);
    });
    
    

});


app.post('/addRoundTeam/:teams', (req, res) => {
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
    checkR2(teamNum, (team) => {
        if (team === true) {
            res.send('This team number is already in use!');
        }
        else {
            addRoundTeam(teamDet, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
        
                res.send(result);
            });
        }
        
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
    checkRev(teamNum, (team) => {
        if (team === true) {
            res.send('This team number is already in use!');
        }
        else {
            addRevTeam(teamDet, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
        
                res.send(result);
            });
        }
        
    });
    
});

app.get('/fetchRoundTeams', (req, res) => {
    getRoundDone((err, result) => {
        if (err) {
            res.send(err);
        }
        // res.send(result);
        console.log('Result Done: ', result);
        // res.send(result);

        countRound((err, count) => {
            if(err) {
                res.render('404.hbs');
            }
            var finalDone = {
                data: result,
                count
            }
            // res.send(finalDone);
            res.render('getRound2.hbs', finalDone);
        });
    });

});

app.post('/saveForFinal/:team', (req, res) => {
    var team = req.params.team;
    countFinal((err, count) => {
        if(err) {
            res.render('404.hbs');
        }

        var teamNum = count + 1;
        getRoundSelected(team, (err, resp) => {
            if (err) {
                return res.render('404.hbs');
            }
            console.log(teamNum);
            resp[0].teamNum = teamNum;
            const finalObj = {
                reviewOne : resp[0].reviewOne,
                participant : resp[0].participant,
                done : resp[0].done,
                teamNum : resp[0].teamNum,
                email : resp[0].email,
                productName : resp[0].productName,
                teamName : resp[0].teamName,
                description : resp[0].description
            }
            checkRF(team, (teamExist) => {
                if (teamExist === true) {
                    res.send('This team number is already in use!');
                }
                else {
                    
                    
                    // finalObj = _.pickBy(finalObj, (val, key) => key !== '__v');
                    
                    // res.send(finalObj);
                    
                    addTeam(finalObj, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send(err);
                        }
                        putRound2(team, (err, modDoc) => {
                            console.log(modDoc);    
                            res.render('goBack2.hbs', {result});
                        })
                        
                    });
                }
                
            });
        });
        
        // res.send(finalDone);
        // res.render('getRev.hbs', finalDone);
    });
});


app.get('/fetchFinalTeams', (req, res) => {
    getTheFinalDone((err, result) => {
        if (err) {
            res.send(err);
        }
        // res.send(result);
        console.log('Result Done: ', result);
        // res.send(result);

        countFinal((err, count) => {
            if(err) {
                res.render('404.hbs');
            }
            var finalDone = {
                data: result,
                count
            }
            // res.send(finalDone);
            res.render('getFinal.hbs', finalDone);
        });
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
    var marks = parseInt(req.body.marks1) + parseInt(req.body.marks2) + parseInt(req.body.marks3) + parseInt(req.body.marks4) + parseInt(req.body.marks5);
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