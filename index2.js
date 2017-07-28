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
/**
* Middleware es cualquier numero de funciones que son invocadas por express. Ejemplo:
* Middleware -> app.get'/playerid/:value'
* Función que llama el Middleware -> getPlayerId
*/

app.get('/playerid/:value', getPlayerId);
app.get('/runes/:value', getRunes);
app.get('/masteries/:value', getMasteries);
app.get('/league/:value', getPlayerLeague);
app.get('/champm/:value', getChampMastery);

function getPlayerId(req, res, next) {
  let value = req.params.value;
  let server = req.query.server || 'la1';
  //console.log(server)
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
/**
*@param req. Argumento a la funcion middleware
*@param
*@param
*
*/

function getChampMastery(req, res, next) {
  //Se inicia una variable.......
  let value = req.params.value;
  let server = req.query.server || 'la1';
  //riotApi
  riotApi.getChampMastery(value, server).then((champm) => {

/**
*@param champm obtenido
*/
    res.json(champm);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}
