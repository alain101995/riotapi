var express = require('express');
var app = express();
const riotApi = require('./riotapi2');
const hostname = '127.0.0.1';
const PORT = 3000;
app.listen(PORT);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('Main page');
});

app.get('/runes/:value', getRunes);
app.get('/masteries/:value', getMasteries);
app.get('/league/:value', getPlayerLeague);
app.get('/champm/:value', getChampMastery);
app.get('/playerid/:value', getPlayerId);

function getPlayerId(req, res, next) {
  let value = req.params.value;
  let server = req.query.server || 'la1';
  riotApi.getPlayerId(value, server).then((playerId) => {
    res.json(playerId);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getRunes(req, res, next) {

  let value = req.params.value;
  let server = req.query.server || 'la1';
  riotApi.getRunes(value, server).then((runes) => {
    res.json(runes);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getMasteries(req, res, next) {

  let value = req.params.value;
  let server = req.query.server || 'la1';
  riotApi.getMasteries(value, server).then((masteries) => {
    res.json(masteries);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getPlayerLeague(req, res, next) {

  let value = req.params.value;
  let server = req.query.server || 'la1';
  riotApi.getPlayerLeague(value, server).then((playerLeague) => {
    res.json(playerLeague);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getChampMastery(req, res, next) {

  let value = req.params.value;
  let server = req.query.server || 'la1';
  riotApi.getChampMastery(value, server).then((champm) => {
    /*  let championPoints = champm.map(function cleanData(champMastery) {
        let result = {
          championId: champMastery.championId,
          championPoints: champMastery.championPoints
        }
        return result;
      });
      */
    res.json(champm); //championPoints
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}
