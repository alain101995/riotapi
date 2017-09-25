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
/*
mongoose.Promise = global.Promise;
connect to mongo function
core.connect = function connect(opts) {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${opts.server}:${opts.port}/${opts.db}`);
  return mongoose.connection;
};
const expirationDate = new Schema({
  expire_at: {type: Date, default: Date.now, expires: 7200} 
})

So for removing documents before 1 September 2013 your command should be

db.user_track.remove( { access_time : {"$lt" : new Date(2013, 8, 1) } })
*/
