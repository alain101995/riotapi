const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const champmSchema = new Schema({
    name: String,
    tier: String,
    queue: String,
    entries: [{
        playerOrTeamId: String,
        playerOrTeamName: String,
        leaguePoints: Number,
        wins: Number,
        losses: Number,
        rank: String,
        veteran: Boolean,
        inactive: Boolean,
        freshBlood: Boolean,
        hotStreak: Boolean
    }]
});

const runesModel = mongoose.model('champm', champmSchema);
dbChampm = function (data) {
    for (let runesOf of data) {
        let runesData = new runesModel({
            expireAt: new Date().getTime() + 1 * 24 * 60 * 60000, // new Date('September 25, 2017 14:00:00')   new Date().getTime() + 1 * 24 * 60 * 60000
            name: data.name,
            tier: data.tier,
            queue: data.queue,
            entries: [{
                playerOrTeamId: data.entries.playerOrTeamId,
                playerOrTeamName: data.entries.playerOrTeamName,
                leaguePoints: data.entries.leaguePoints,
                wins: data.entries.wins,
                losses: data.entries.losses,
                rank: data.entries.rank,
                veteran: data.entries.veteran,
                inactive: data.entries.inactive,
                freshBlood: data.entries.freshBlood,
                hotStreak: data.entries.hotStreak
            }]
        });
    }
}