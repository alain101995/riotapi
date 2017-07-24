var request = require('request');
var fs = require ('fs');
const PORT = 3000;
app.listen(PORT);
request
  .get('http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png ')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(request.put('http://mysite.com/img.png'))

/*
request
  .get('http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(fs.createWriteStream('doodle.png'))

DOWNLOAD CONTENT
  */
