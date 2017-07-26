const request = require("request");
let summonerid = 59627;
//let server = "la1";
const API_KEY = "RGAPI-f35372e9-c045-48ca-bcd1-6bd653e9deac";

function buildUrl(summonerId, server, endpoint) {
  return `https://${server}.api.riotgames.com/${endpoint}/${summonerId}`;
}

var getMasteries = function(summonerId, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(summonerId, server, 'lol/platform/v3/masteries/by-summoner');
    makeRequest(url).then((data) => {
      //console.log(data)
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
}

var getRunes = function(summonerId, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(summonerId, server, 'lol/platform/v3/runes/by-summoner');
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
}

var getPlayerLeague = function(summonerId, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(summonerId, server, 'lol/league/v3/leagues/by-summoner');
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
  /*
  let url = buildUrl(summonerId, server, 'lol/league/v3/leagues/by-summoner');
  return makeRequest(url);
  */
}

var getChampMastery = function(summonerId, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(summonerId, server, 'lol/champion-mastery/v3/champion-masteries/by-summoner');
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
}

function makeRequest(url) {
  return new Promise(function(resolve, reject) {
    if (!url) {
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
