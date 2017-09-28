const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const matchesSchema = new Schema({
    expireAt: {},
    matches: [{
        platformId: String,
        gameId: Number,
        champion: Number,
        queue: Number,
        season: Number,
        timestamp: Number,
        role: String,
        lane: String
    }]
});

const matchesModel = mongoose.model('matches', masteriesSchema);
dbMasteries = function (data) {
    for (let matchesOf of data.matches) {
        let matchesData = new masteriesModel({
            expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
            matches: [{
                platformId: matchesOf.platformId,
                gameId: matchesOf.gameId,
                champion: matchesOf.champion,
                queue: matchesOf.queue,
                season: matchesOf.season,
                timestamp: matchesOf.timestamp,
                role: matchesOf.role,
                lane: matchesOf.lane
            }]
        });
    }
}