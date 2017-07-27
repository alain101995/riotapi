const request = require("request");
const API_KEY = "RGAPI-ff47b210-c7ab-451e-a697-b4b6a905628f";

function buildUrl(value, server, endpoint) {
  return `https://${server}.api.riotgames.com/${endpoint}/${value}`;
}

var getPlayerId = function(value, server){
  return new Promise(function(resolve, reject){
    let url = buildUrl(value, server, 'lol/summoner/v3/summoners/by-name')
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error =>{
      reject(error)
    })
  });
}

var getMasteries = function(value, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(value, server, 'lol/platform/v3/masteries/by-summoner');
    makeRequest(url).then((data) => {
      //console.log(data)
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
}

var getRunes = function(value, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(value, server, 'lol/platform/v3/runes/by-summoner');
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
}

var getPlayerLeague = function(value, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(value, server, 'lol/league/v3/leagues/by-summoner');
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
  /*
  let url = buildUrl(value, server, 'lol/league/v3/leagues/by-summoner');
  return makeRequest(url);
  */
}

var getChampMastery = function(value, server) {
  return new Promise(function(resolve, reject) {
    let url = buildUrl(value, server, 'lol/champion-mastery/v3/champion-masteries/by-summoner');
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
  getChampMastery: getChampMastery,
  getPlayerId:getPlayerId
};
