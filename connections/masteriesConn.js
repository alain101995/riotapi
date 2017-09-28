const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const masteriesSchema = new Schema({
    expireAt: {},
    summonerId: Number,
    pages: [{
        id: Number,
        name: String,
        current: Boolean,
        masteries: [{
            id: Number,
            rank: Number
        }],
    }]
});

const masteriesModel = mongoose.model('masteries', masteriesSchema);
dbMasteries = function (data) {
    for (let masteriesOf of data.pages) {
        let masteriesData = new masteriesModel({
            expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
            summonerId: data.summonerId,
            pages: [{
                id: masteriesOf.id,
                name: masteriesOf.name,
                current: masteriesOf.current,
                masteries: [{
                    id: masteriesOf.masteries.id,
                    rank: masteriesOf.masters.rank
                }],
            }]
        });
    }
}