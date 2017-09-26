const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storedRunes = {}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });

const runesSchema = new Schema({

  strict: false,
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
// new Date('September 25, 2017 14:00:00')
// new Date().getTime() + 1 * 24 * 60 * 60000
exports.dbRunes = function (data) {
  let runesModel = mongoose.model('runes', runesSchema);
  // console.log('Sent data', data)
  for (let runesOf of data.pages) {
    let runesData = new runesModel({
      expireAt: new Date().getTime() + 1 * 24 * 60 * 60000,
      summonerId: data.summonerId,
      pages: [{
        id: runesOf.id,
        name: runesOf.name,
        current: runesOf.current,
        slots: [{
          runeSlotId: 1, //runesOf.slots.runeSlotId
          runeId: 6 // runesOf.slots.runeId
        }]
      }]
    });
    // If runesData.expireAt < current date ==> update data on database and expire Time
    
    // Else return data from database
    // https://stackoverflow.com/questions/5818303/how-do-i-perform-an-id-array-query-in-mongoose
    // http://mongoosejs.com/docs/queries.html

    if (runesData.expireAt) { // Math.round(runesData.expireAt / 1000) < Math.round(new Date().getTime() / 1000)
      runesModel.findOne({ 'summonerId': data.summonerId }, function (err, summonerId) {
        if(err) return (err);
        // If(runesData.expireAt < new Date().getTime())
        console.log('HERE', data.summonerId)
      });
      // console.log('Expiration Time', runesData.expireAt, 'Current Time', new Date().getTime())
      runesData.save(function (error) {
        console.log('Data saved');
        if (error) {
          console.log(error);
        }
      });
      // console.log('Expiration Date :', runesData.expireAt / 1000, 'Current Date :', Math.round(new Date().getTime() / 1000))
    } else {
      runesData.remove({}, function (error) { // Remove not working because slots: runeSlotId and runeId is undefined
        if (error) return ('Error: ', error);
        console.log('Data removed')
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
