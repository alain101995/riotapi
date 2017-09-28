const express = require('express');
const app = express();
const runesConn = require('./connections/runesConn');
const riotApi = require('./riotapi2');
const PORT = 3000;
app.listen(PORT);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
/*
setInterval(function () {
  console.log('Hello')
}, 3000)
*/

//req = representa la peticion http que contiene todos los datos de la petición
//res = representa la respuesta o datos que express da cuando recibe una request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  console.log(new Date());
  res.send("Main Page")
});
/*
Middleware es cualquier numero de funciones que son invocadas por express. Ejemplo:
Middleware -> app.get'/playerid/:value'
Función que llama el Middleware -> getPlayerId
app.METHOD(PATH, HANDLER)
app es una instancia de express.
METHOD es un método de solicitud HTTP.
PATH es una vía de acceso en el servidor.
HANDLER es la función que se ejecuta cuando se correlaciona la ruta.
*/
app.get('/api/playerid/:value', getPlayerId);
app.get('/api/runes/:value', getRunes);
app.get('/api/masteries/:value', getMasteries);
app.get('/api/league/:value', getPlayerLeague);
app.get('/api/champm/:value', getChampMastery);
app.get('/api/matches/:value', getMatches);
//app.use(errorHandler);
//next pasa el control a la siguiente función del middleware, de lo contrario la solicitud quedará colgada
function getPlayerId(req, res, next) {
  let value = req.params.value; //SummonerId o summoner Name
  let server = req.query.server || 'la1';
  riotApi.getPlayerId(value, server).then((playerId) => {
    //Datos del request obtenidos y mostrados en forma de JSON
    res.json(playerId);
    //req.X = {};
    //req.X.riotResponse = playerId;
    //next();
  }, (error) => {
    console.log('error', error);
    next(new Error('Ocurrio un Error'));
  });
}

function errorHandler(error, req, res, next) {
  res.json({
    errors: [error]
  })
}

function getRunes(req, res, next) {
  let value = req.params.value; // summonerId
  let server = req.query.server || 'la1';

  runesConn.findInDb(value).then((expirated) => {
    if (expirated) {
      riotApi.getRunes(value, server).then((runes) => {
        runesConn.dbRunes(runes);
        // runesConn.dbRunes(); // Save
        // .then(runes) runesConn.remove and save
        console.log('Request made', runes)
        res.json(runes);
      }, (error) => {
        console.log('error', error);
        next(error);
      });
    } else {
      // Return data from database
    }
  });
}

/* 
  runesConn.findInDb(value).then((expirated) => {
    if (expirated) {
      riotApi.getRunes(value, server).then((runes) => {
        // .then() runesConn.remove and save
        console.log('Request made', runes)
        res.json(runes);
      }, (error) => {
        console.log('error', error);
        next(error);
      });
    } else {
      // Return data from database
      runesConn.dbRunes(runes); // <------------------------------HERE
    }
  });
}
*/
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
    res.json(champm);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}

function getMatches(req, res, next) {

  let value = req.params.value;
  let server = req.query.server || 'la1';
  riotApi.getMatches(value, server).then((matches) => {
    res.json(matches);
  }, (error) => {
    console.log('error', error);
    next(error);
  });
}
