# riotapi

Json to table
--------------
http://json2table.com/
https://stackoverflow.com/questions/11922383/access-process-nested-objects-arrays-or-json

https://expressjs.com/en/4x/api.html#req
--------------
jlanderos@itexico.net

app.get('/hi/:param1', function(req, res){} );
and given this URL  http://www.google.com/hi/there?qs1=you&qs2=tube

You will have:
req.query
{
  qs1: 'you',
  qs2: 'tube'
}
req.params
{
  param1: 'there'
}
