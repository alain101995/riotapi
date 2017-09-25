// var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var storedRunes = {}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });

var runesSchema = new Schema({
  expireAt: {},
  summonerId: Number,
  pages: [{
    id: Number,
    name: String,
    current: Boolean,
    slots: [{
      runeSlotId: Number,
      runeId: Number
    }]
  }]
});
exports.dbRunes = function (data) {
  var runesModel = mongoose.model('runes', runesSchema);
  // console.log('Sent data', data)

  storedRunes[data.summonerId] = data;
  if (storedRunes[data.summonerId]) {
    console.log('I have been here before')
  }

  for (let runesOf of data.pages) {

    var runesData = new runesModel({
      expireAt: new Date('September 25, 2017 14:10:00'),
      summonerId: data.summonerId,
      pages: [{
        id: runesOf.id,
        name: runesOf.name,
        current: runesOf.current,
        slots: [{
          runeSlotId: runesOf.slots.runeSlotId,
          runeId: runesOf.slots.runeId
        }]
      }]
    });
    console.log('Stored', storedRunes[data.summonerId]);
    if (Math.round(runesData.expireAt / 1000) < Math.round(new Date().getTime() / 1000)) {
      // console.log('Expiration Date :', runesData.expireAt / 1000, 'Current Date :', Math.round(new Date().getTime() / 1000))
      runesData.remove({});
    } else {
      // console.log('Current Runes Data', runesData)
      runesData.save(function (error) {
        console.log('Data saved');
        if (error) {
          console.log(error);
        }
      });
    }
  }
}

// module.exports = mongoose.model('runes', runesSchema);

// runesSchema.deleteMany({});
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

db.log_events.insert( {
   "expireAt": new Date('September 25, 2013 14:00:00'),
   "logEvent": 2,
   "logMessage": "Success!"
} )


exports.insert = function (runes) {
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
    if (err) { return console.dir(err); }
    var collection = db.collection('inventory');
    // var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
    return collection.insert(runes);

  });
}
*/
