   const request = require("request");
   let summonerid = 59627;
   let server = "la1";
   const URL = `https://${server}.api.riotgames.com/lol/platform/v3/runes/by-summoner/${summonerid}`;
   const API_KEY = "RGAPI-7997d1c6-acb2-49cc-8b9e-1407300c02d3";

   function buildUrl(summonerId, server, endpoint){
       return `https://${server}.api.riotgames.com/${endpoint}/${summonerId}`;
   }

   function getMasteries(summonerId, server, callback) {
       url = buildUrl(summonerId, server);
       makeRequest(url, callback);
   }

   function getRunes(summonerId, server, callback){
       let url = buildUrl(summonerId, server, 'lol/platform/v3/runes/by-summoner');
       makeRequest(url, callback);
   }

   function getPlayerLeague(summonerId, server, callback){
       url = buildUrl(summonerId, server, 'lol/league/v3/leagues/by-summoner'); ///{summonerId}
       makeRequest(url, callback);
   }

   function getChampMastery(summonerId, server, callback){
     let url = buildUrl(summonerId, server, '/lol/champion-mastery/v3/champion-masteries/by-summoner');///{summonerId}
     makeRequest(url, callback);
   }

   function makeRequest(url, callback){

     if(!url){
       callback('something is missing');
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
   // .filter debe retornar un boolean
   // true: se quedan
   // false: se descartan

   /*
   https.get(URL, (res)=> {
     res.on('data', (d) => {
       //console.log(d.toString())
       // 'asdasdasd/Atsdsdsdtack Speed'
       let result = JSON.parse(d.toString());
       let adPages = result.pages.filter((page) => {
         return (page.name.indexOf("Attack") >= 0);
       });
       let totalSlots = result.pages.reduce((accumulator, currentPage) => {
         let slots = 0;
         if(currentPage.slots){ // undefined
           slots = currentPage.slots.length;
         }
         return accumulator + slots;
       },0);
       console.log(totalSlots);
     });
   });
   let adPages = result.pages.filter((page) => {
     return (page.name.indexOf("AP") >= 0);
   });
   let totalSlots = result.pages.reduce((accumulator, currentPage) => {
     let slots = 0;
     if(currentPage.slots){ // undefined
       slots = currentPage.slots.length;
     }
     return accumulator + slots;
   },0);
   */

   /*getSummonerId(summonerName, server, version){
     let endpoint = `https;//${server}.api.pvp.net/api/lol/${SERVER}/${VERSION}/${summonerNamne}`;
     https.get(endpoint, res =>{
       // ..
     });
   }
   */
