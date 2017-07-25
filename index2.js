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

app.get('/runes/:summonerId', getRunes);
app.get('/masteries/:summonerId', getMasteries);
app.get('/league/:summonerId', getPlayerLeague);
app.get('/champm/:summonerId', getChampMastery);

function getRunes(req, res, next) {

  let summonerId = req.params.summonerId;
  let server = req.query.server || 'la1';
  riotApi.getRunes(summonerId, server).then((runes) => {
    res.json(runes);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getMasteries(req, res, next) {

  let summonerId = req.params.summonerId;
  let server = req.query.server || 'la1';
  riotApi.getMasteries(summonerId, server).then((masteries) => {
    res.json(masteries);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getPlayerLeague(req, res, next) {

  let summonerId = req.params.summonerId;
  let server = req.query.server || 'la1';
  riotApi.getPlayerLeague(summonerId, server).then((playerLeague) => {
    res.json(playerLeague);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getChampMastery(req, res, next) {

  let summonerId = req.params.summonerId;
  let server = req.query.server || 'la1';
  riotApi.getChampMastery(summonerId, server).then((champm) => {
    let championPoints = champm.map(function cleanData(champMastery) {
      let result = {
        championId: champMastery.championId,
        championPoints: champMastery.championPoints
      }
      return result;
    });
    res.json(championPoints);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}
