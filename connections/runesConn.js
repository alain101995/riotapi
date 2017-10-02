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
  pages: Array // Properties => id: Number, name: String, current: Boolean, slots [{ runeSlotId: Number, runeId: Number}]
});
const Runes = mongoose.model('runes', runesSchema);

function findInRunesDb(summonerId) {
  return new Promise(function (resolve, reject) {
    Runes.find({ 'summonerId': summonerId }, 'summonerId name expireAt pages', function (err, runesData) {
      console.log('RunesData', runesData)
      if ( runesData.length < 1 || runesData[0].expireAt < new Date(new Date().getTime())) { // <======== change > for <
        // console.log('Theres no data or its expired (connection)', runesData[0].expireAt, 'My Time', new Date(new Date().getTime()));
        // console.log('Runes Data', runesData)
        resolve(false)
      }
      else {
        // console.log('Data not expired and there is data', runesData[0].expireAt, 'My Time', new Date(new Date().getTime()));
        resolve(runesData)
      }
      reject(err)
    });
  });
}

function create(runes) {
  const expireAt = new Date(new Date().getTime() + oneDay),
    // new Date('September 25, 2017 14:00:00') new Date(new Date().getTime() + oneDay)  new Date().getTime() + 1 * 24 * 60 * 60000
    runesData = new Runes({
      expireAt,
      summonerId: runes.summonerId,
      pages: runes.pages
    });
  console.log('Created', runesData);
  return runesData.save();
}

function remove(summonerId) {
  Runes.remove({ 'summonerId': summonerId }, function (err) {
    if (err) return (err);
    console.log('Removed')
  });
}

module.exports = {
  create,
  findInRunesDb,
  remove
}

/*
function save(runes) {
  runesData.save(runes, function (error) {
    console.log('Data saved');
    if (error) {
      console.log(error);
    }
  });
}
*/