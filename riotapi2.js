
   const request = require("request");
   let summonerid = 59627;
   let server = "la1";
   const API_KEY = "RGAPI-cecefeaf-fcf7-4b26-9bb4-9ccc4dbac991";

   function buildUrl(summonerId, server, endpoint){
       return `https://${server}.api.riotgames.com/${endpoint}/${summonerId}`;
   }

   var getMasteries = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, 'lol/platform/v3/masteries/by-summoner');
           resolve(makeRequest(url));
            });
   }

   var getRunes = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, 'lol/platform/v3/runes/by-summoner');
           resolve(makeRequest(url));
            });
   }

   var getPlayerLeague = function(summonerId, server) {
        let promise = new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, 'lol/league/v3/leagues/by-summoner');
           resolve(makeRequest(url));
            });
   }

   var getChampMastery = function(summonerId, server) {
        return new Promise(function(resolve, reject){
          let url = buildUrl(summonerId, server, '/lol/champion-mastery/v3/champion-masteries/by-summoner');
           resolve(makeRequest(url));
            });

   }

   function makeRequest(url){
      return new Promise(function(resolve, reject){
   if(!url){
    reject('something is missing');
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
    resolve(response.body);
   });
   });
   }

 module.exports = {
   getRunes: getRunes,
   getMasteries: getMasteries,
   getUrl: buildUrl,
   getPlayerLeague: getPlayerLeague,
   getChampMastery: getChampMastery
 };
