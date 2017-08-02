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

Scalability
* Angular is easy to scale thanks to its design as well as a powerful CLI.
* React claims to be more testable and therefore scalable than vue and I think that is partly true.

3rd party library compatibility
* React. Although it doesn’t work with DOM, it is pure JavaScript logic and its popularity even the DOM based libraries have their alternative in React.
* Angular would have done better, if not Typescript that requires type definitions for every library.

Company’s perspective
* Angular has free open source licence. It is supported by Google, making it probably the best choice for a company, as there is also less things that differ between angular practices.
* React comes with a patent clause that for some businesses would be quite a big issue. However, there are also a few alternatives that work in the same way as react and even use the save syntax. I personally like inferno and RAX.

Simplicity + code length
* react is fairly simple to understand but in fact it takes a long time to set up a react project.
* angular is not simple at all. It’s complexity often causes a lot of confusion and angular specific 3rd party libraries and syntax

Development time
* React takes longer to set up, but then you can start to make an app and it should be relatively easy to add new features.
* Angular although being very competitive, the amount of unnecessary syntax it requires to do simple things puts angular in the last place.
