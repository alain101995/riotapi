const request = require("request");
const API_KEY = "RGAPI-8abbf5b5-21d5-4ded-9ad3-678f68b25259";

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
/**
* Obtener maestrias
* Consultar la API de Riot para obtener una lista de maestrias
* @param {string | number} summoner Identificador de la cuenta a consultar
* @param {string} server Identificador del servidor de Riot en donde fue registrada la cuenta
* @return {Promise}
*/
var getChampMastery = function(value, server) {
  console.log(value, server);
  return new Promise(function(resolve, reject) {
    // Generar URL incluyendo parametros del summoner y servidor
    let url = buildUrl(value, server, 'lol/champion-mastery/v3/champion-masteries/by-summoner');

    // Realizar peticion HTTP al servidor de RIOT
    makeRequest(url).then((data) => {
      // Exitoso, promesa resuelta
      resolve(data)
    }).catch(error => {
      // Error, promesa rechazada
      reject(error)
    })
  });
}

var getMatches = function(value, server) {
  return new Promise(function(resolve, reject) {
    let url =  `https://${server}.api.riotgames.com/lol/match/v3/matchlists/by-account/${value}/recent`;
    makeRequest(url).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  });
}


/**
* Hacer HTTP Request a la URL solicitada
* @param {string} url Servidor y Endpoint a consultar
* @return {Promise}
*/
function makeRequest(url) {
  return new Promise(function(resolve, reject) {
    if (!url) {
      // Si la URL está en blanco ('') o no tiene valor (undefined o null)
      reject('something is missing');
      return; // Evitar continuacion
    }

    // Generar objeto QueryString que contiene la API Key de Riot
    let queryString = {
      api_key: API_KEY
    };

    // Generar objeto de configuracion necesario por el modulo Request.js
    let config = {
      url: url, // URL a consultar
      qs: queryString, // queryString que contiene la API key, ej: ?api_key=xx
      json: true // Se espera una respuesta en JSON, por lo tanto se parseara a objeto de javascript
    };
    // Peticion con el verbo GET
    request.get(config, (error, response) => {
      // Callback de peticion,
      // TODO: Validar si hubo un error en la peticion

      // Peticion exitosa, resolver promesa con el body de la respuesta
      // Todas las respuestas contiene un cuerpo, que request.js define en response.body
      resolve(response.body);
    });
  });
}
//Permite exportar funciones a otros archivos.
module.exports = {
  getRunes: getRunes,
  getMasteries: getMasteries,
  getUrl: buildUrl,
  getPlayerLeague: getPlayerLeague,
  getChampMastery: getChampMastery,
  getPlayerId:getPlayerId,
  getMatches:getMatches
};
