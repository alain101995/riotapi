const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storedRunes = {}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
let final = {};
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
      expireAt: new Date('September 25, 2017 14:00:00'),
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
    var searched = runesModel.findOne({ 'summonerId': data.summonerId }, function (err, summonerId) {
      if (err) return (err);
    })
    console.log('Searched', searched)
    if (runesData.expireAt < new Date().getTime()) {
      console.log('HEY!')
    }
  }


  // If runesData.expireAt < current date ==> update data on database and expire Time

  // Else return data from database
  // https://stackoverflow.com/questions/5818303/how-do-i-perform-an-id-array-query-in-mongoose
  // http://mongoosejs.com/docs/queries.html

 // if (runesData.expireAt) { // Math.round(runesData.expireAt / 1000) < Math.round(new Date().getTime() / 1000)
 // }

  function find() {
    runesModel.findOne({ 'summonerId': data.summonerId }, function (err, summonerId) {
      if (err) return (err);
      // If(runesData.expireAt < new Date().getTime())
      console.log('HERE', data.summonerId)
    });
  }
  // console.log('Expiration Time', runesData.expireAt, 'Current Time', new Date().getTime())
  function save() {
    runesData.save(function (error) {
      console.log('Data saved');
      if (error) {
        console.log(error);
      }
    });
  }
  // console.log('Expiration Date :', runesData.expireAt / 1000, 'Current Date :', Math.round(new Date().getTime() / 1000))
  function remove() {
    runesData.remove({}, function (error) { // Remove not working because slots: runeSlotId and runeId is undefined
      if (error) return ('Error: ', error);
      console.log('Data removed')
    });
  }
}
