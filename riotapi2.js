const request = require("request");
   let summonerid = 59627;
   let server = "la1";
   const API_KEY = "RGAPI-cecefeaf-fcf7-4b26-9bb4-9ccc4dbac991";

   function buildUrl(summonerId, server, endpoint){
       return `https://${server}.api.riotgames.com/${endpoint}/${summonerId}`;
   }

   var getMasteries = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, 'lol/champion-mastery/v3/champion-masteries/by-summoner');
           resolve(makeRequest(url));
           reject('There was an error');
         });
   }

   var getRunes = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, 'lol/platform/v3/runes/by-summoner');
           resolve(makeRequest(url));
           reject('There was an error');
         });
   }

   var getPlayerLeague = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, 'lol/league/v3/leagues/by-summoner');
           resolve(makeRequest(url));
           reject('There was an error');
         });
   }

   var getChampMastery = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, '/lol/champion-mastery/v3/champion-masteries/by-summoner');
           resolve(makeRequest(url));
           reject('There was an error');
         });
   }

   function makeRequest(url){
     if(!url){
      console.log('something is missing');
      return;
     }

     let queryString = {
       api_key: API_KEY
     };

     let config = {
       url: url,
       qs: queryString,
       json: true
     };

     request.get(config, (error, response) => {
       callback(error, response.body);
     });
   }

 module.exports = {
   getRunes: getRunes,
   getMasteries: getMasteries,
   getUrl: buildUrl,
   getPlayerLeague: getPlayerLeague,
   getChampMastery: getChampMastery
 };
