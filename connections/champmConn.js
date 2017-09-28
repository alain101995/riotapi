const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const champmSchema = new Schema({
    expireAt: {},
    playerId: Number,
    championId: Number,
    championLevel: Number,
    championPoints: Number,
    lastPlayTime: Number,
    championPointsSinceLastLevel: Number,
    championPointsUntilNextLevel: Number,
    chestGranted: Boolean,
    tokensEarned: Number
});

const champmModel = mongoose.model('champm', champmSchema);
dbChampm = function (data) {
    for (let champmOf of data) {
        let champmData = new champmModel({
            expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
            playerId: data.playerId,
            championId: data.championId,
            championLevel: data.championLevel,
            championPoints: data.championPoints,
            lastPlayTime: data.lastPlayTime,
            championPointsSinceLastLevel: data.championPointsSinceLastLevel,
            championPointsUntilNextLevel: data.championPointsUntilNextLevel,
            chestGranted: data.chestGranted,
            tokensEarned: data.tokensEarned
        });
    }
}