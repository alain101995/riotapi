
  function getPlayerLeague(req, res){

    let summonerId = req.params.summonerId;
    let server = req.query.server || 'la1';
    console.log(summonerId);
    riotApi.getPlayerLeague(summonerId, server, (errorMessage, playerLeague)=>{

      if(errorMessage){
        return res.json({error: errorMessage});
      }

      res.json(playerLeague);
    });
  }

  app.listen(PORT);
------queries.js

const https = require('https');
var summId = 59627;
let server = "la1";
let request = "league/v3/leagues/by-summoner";
let requiredvalue = "59627";
let apikey = "RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd";
const URL = `https://${server}.api.riotgames.com/lol/${request}/${requiredvalue}?api_key=${apikey}`;
    //https.get(`https://${server}.api.riotgames.com/lol/${request}/${requiredvalue}?api_key=${apikey}`
    //https.get(`https://la1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Alainlegend?api_key=RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd` //Summoner ID
    //https.get(`https://la1.api.riotgames.com/lol/match/v3/matchlists/by-account/200038705/recent?api_key=RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd` //Matchlists
    //https.get(`https://la1.api.riotgames.com/lol/league/v3/leagues/by-summoner/59627?api_key=RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd`, (res)  => { //Player's league
    https.get(`https://${server}.api.riotgames.com/lol/${request}/${requiredvalue}?api_key=${apikey}`, (res)  => {
        console.log(URL);
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
          let result = JSON.parse(d.toString());
        //console.log(result);
        });
    });
/*
Champ Mastery
/lol/champion-mastery/v3/champion-masteries/by-summoner/{summonerId}
https://la1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/59627?api_key=RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd
Player’s league
/lol/league/v3/leagues/by-summoner/{summonerId}
https://la1.api.riotgames.com/lol/league/v3/leagues/by-summoner/59627?api_key=RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd
Matchlist
/lol/match/v3/matchlists/by-account/{accountId}   /recent
https://la1.api.riotgames.com/lol/match/v3/matchlists/by-account/200038705?api_key=RGAPI-4cb3725c-8b57-41cc-b366-1ad239085bfd /recent
Account id: 200038705
Sum id: 59627
 */
http://ddragon.leagueoflegends.com/tool/
