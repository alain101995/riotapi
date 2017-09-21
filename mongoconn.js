var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
exports.insert = function (runes) {
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if(err) { return console.dir(err); }
  var collection = db.collection('inventory');
  // var doc1 = {'hello':'doc1'};
  // var doc2 = {'hello':'doc2'};
  // var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
  return collection.insert(runes);
  
});
}
// http://theholmesoffice.com/mongoose-connection-best-practice/
// http://mongoosejs.com/docs/connections.html#use-mongo-client

mongoose.connect('mongodb://localhost/test');
var myModel = mongoose.model('Test', new Schema ({ name: String }));