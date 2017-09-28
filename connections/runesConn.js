const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const runesSchema = new Schema({
  expireAt: Date,
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

function dbRunes(runes) {
  let runesData = new runesModel({
    expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
    summonerId: runes.summonerId,
    pages: runes.pages
  });
  runesData.save(runes, function (error) {
    console.log('Data saved');
    if (error) {
      console.log(error);
    }
  });
}

function findInDb(summonerId) {
  return new Promise(function (resolve, reject) {
    let sumInDb = runesModel.find({ 'summonerId': summonerId }, function (err, summonerId) {
      if (err) return (err); // Check if sumID exist in db <===

      runesModel.find({}, function (err, summonerId) {
        let userMap = {};
        summonerId.forEach(function (user) {
          userMap[summonerId] = user;
        });
        // console.log('User Map', userMap);
        // res.send(userMap);
      });

      console.log('RUNES MODEL', runesModel.find({}));
      // console.log('DATA LIFE TIME', summonerId.expireAt) // 9/27/2017, 2:42:03 PM
      // console.log('MY TIME', new Date().getTime()) // 9/27/2017, 10:58:03 AM 
      if (summonerId.expireAt < new Date().getTime() + 2 * 24 * 60 * 60000) { // Added + 1 * 24 * 60 * 60000 so the current date is gonna be bigger than expiration date on current data on database (// 9/27/2017, 2:42:03 PM). But it needs to be skipped
        console.log('Data life time', summonerId.expireAt, 'My Time + 1 Day', new Date().getTime() + 1 * 24 * 60 * 60000);
        resolve(true); // summonerId.summonerId or boolean
      } else {
        console.log('Not expired yet')
        // return data
        // https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users
        resolve(false);
      }
      reject(err);
    })
  });
}

function remove() {
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
  dbRunes: dbRunes,
  findInDb: findInDb,
  save: save
}