const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const masteriesSchema = new Schema({
    expireAt: Date,
    summonerId: Number,
    pages: Array
});

const masteriesModel = mongoose.model('masteries', masteriesSchema);
dbMasteries = function (data) {
    let masteriesData = new masteriesModel({
        expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
        summonerId: data.summonerId,
        pages: data.pages
    });
}