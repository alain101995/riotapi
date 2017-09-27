const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const runesSchema = new Schema({
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

const runesModel = mongoose.model('runes', runesSchema);
dbRunes = function (data) {
  for (let runesOf of data.pages) {
    let runesData = new runesModel({
      expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
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
  }
}

findInDb = function (summonerId) {
  return new Promise(function (resolve, reject) {
    // console.log('IM HERE', summonerId)
    let sumInDb = runesModel.findOne({ 'summonerId': summonerId }, function (err, summonerId) {
      if (err) return (err); // Check if sumID exist in db <===
      // console.log('DATA LIFE TIME', summonerId.expireAt) // 9/27/2017, 2:42:03 PM
      // console.log('MY TIME', new Date().getTime()) // 9/27/2017, 10:58:03 AM 
      if (summonerId.expireAt < new Date().getTime() + 1 * 24 * 60 * 60000) { // Added + 1 * 24 * 60 * 60000 so the current date is gonna be bigger than expiration date on current data on database (// 9/27/2017, 2:42:03 PM). But it needs to be skipped
        console.log('Expired')
        resolve(true); // summonerId.summonerId or boolean
      } else {
        console.log('Not expired yet')
        resolve(false);
      }
    }).catch(error => {
      reject(error);
    });
  });
}

function remove() {
  runesData.remove({}, function (error) { // Remove not working because slots: runeSlotId and runeId is undefined
    if (error) return ('Error: ', error);
    console.log('Data removed')
  });
}

function save() {
  runesData.save(function (error) {
    console.log('Data saved');
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  dbRunes: dbRunes,
  findInDb: findInDb
}