  var express = require('express');
  var app = express();
  const riotApi = require('./riotapi');
  const hostname = '127.0.0.1';
  const PORT = 3000;


  app.get('/', function(req, res){
    res.send('Main page');
  });

  app.get('/runes/:summonerId', getRunes);
  app.get('/masteries/:summonerId', getMasteries);
  app.get('/league/:summonerId', getPlayerLeague);
  app.get('/champm/:summonerId', getChampMastery);

  function getRunes(req, res){

    let summonerId = req.params.summonerId;
    let server = req.query.server || 'la1';
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
    riotApi.getMasteries(summonerId, server, function hacerAlTerminar(errorMessage, masteries){

      if(errorMessage){
        res.json({error: errorMessage});
        return;
      }

      res.json(masteries);
    });
  }
  function getPlayerLeague(req, res){

    let summonerId = req.params.summonerId;
    let server = req.query.server || 'la1';
    riotApi.getPlayerLeague(summonerId, server, (errorMessage, playerLeague)=>{

      if(errorMessage){
        return res.json({error: errorMessage});
      }

      res.json(playerLeague);
    });
  }

  function getChampMastery(req, res){

    let summonerId = req.params.summonerId;
    let server = req.query.server || 'la1';
    riotApi.getChampMastery(summonerId, server, (errorMessage, champm)=>{

      if(errorMessage){
        return res.json({error: errorMessage});
      }
      let championPoints = champm.map(function cleanData(champMastery){
        let result =  {
          championId: champMastery.championId,
          championPoints: champMastery.championPoints
        }
        return result;
      });

      res.json(championPoints); //
    });
  }

  app.listen(PORT);
