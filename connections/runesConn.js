const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });

const seconds = 1000,
  minutes = 60,
  hour = 60,
  days = 24

const oneDay = seconds * minutes * hour * days;

const runesSchema = new Schema({
  expireAt: Date,
  summonerId: Number,
  pages: Array
});
/*
  pages: [{
    id: Number,
    name: String,
    current: Boolean,
    slots: [{
      runeSlotId: Number,
      runeId: Number
    }]
    }]
    */
const Runes = mongoose.model('runes', runesSchema);

function create(runes) {
  const expireAt = new Date(new Date().getTime() + oneDay), // new Date('September 25, 2017 14:00:00') new Date(new Date().getTime() + oneDay)  new Date().getTime() + 1 * 24 * 60 * 60000
    runesData = new Runes({ // <== was const runesData
      expireAt,
      summonerId: runes.summonerId,
      pages: runes.pages
    });
  console.log('CREATED', runesData)
  return runesData.save();
}

function findInRunesDb(summonerId) {
  return new Promise(function (resolve, reject) {
    // Runes.find({}, 'expireAt summonerId pages', function (err, runesData) {
    Runes.find({ 'summonerId': summonerId }, 'summonerId expireAt pages', function (err, runesData) {
      if (runesData.length < 1) {
        console.log('Theres no data (connection)')
        resolve(false)
      } else {
        if (runesData[0].expireAt < new Date(new Date().getTime())) // Data is nos being used yet but already saves data if summonerId is not in db
        console.log('Runes Data (Connection)', runesData);
        resolve(runesData)
      }
      reject(err)
      /*
            // Runes.findOne('summonerId', function (err, runesData) {}) // ...
            if (runesData.expireAt < new Date(new Date().getTime())) {
              // Added + 1 * 24 * 60 * 60000 so the current date is gonna be bigger than expiration date on current data on database (// 9/27/2017, 2:42:03 PM). But it needs to be skipped
              console.log('Data expired', runesData.expireAt, 'My Time', new Date(new Date().getTime()));
              resolve(runesData); // summonerId.summonerId or boolean
            } else {
              console.log('Not expired yet', runesData.expireAt, 'My Time', new Date(new Date().getTime()));
              resolve(false);
            }
            reject(err);
          })
      
          // summonerId.expireAt < new Date(new Date()).getTime()
        });
        */
    });
  });
}

function remove(summonerId) {
  runesData.remove({}, function (error) { // Remove not working because slots: runeSlotId and runeId is undefined
    if (error) return ('Error: ', error);
    console.log('Data removed')
  });
}

function save(runes) {
  runesData.save(runes, function (error) {
    console.log('Data saved');
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  create,
  findInRunesDb: findInRunesDb,
  save: save
}