
  var express = require('express');
  var app = express();
  const riotApi = require('./riotapi');
  const hostname = '127.0.0.1';
  const PORT = 3000;

  console.log(riotApi.apiKey)


  app.get('/', function(req, res){
    res.send('<h1>Main page</h1>');
  });

  app.get('/runes/:summonerId', getRunes);
  app.get('/masteries/:summonerId', getMasteries);
  app.get('/league/:summonerId', getPlayerLeague);

  function getRunes(req, res){

    let summonerId = req.params.summonerId;
    let server = req.query.server || 'la1';
    console.log(summonerId);
    riotApi.getRunes(summonerId, server, (errorMessage, runes)=>{

      if(errorMessage){
        return res.json({error: errorMessage});
      }

      res.json(runes);
    });
  }

  function getMasteries(req, res){

    let summonerId = req.params.summonerId;
    let server = req.query.server || 'la1';
    console.log(summonerId);
    riotApi.getMasteries(summonerId, server, function hacerAlTerminar(errorMessage, masteries){

      if(errorMessage){
        res.json({error: errorMessage});
        return;
      }

      res.json(masteries);
    });
  }
