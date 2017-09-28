const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
const leagueSchema = new Schema({
    expireAt: {},
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

const leagueModel = mongoose.model('league', leagueSchema);
dbLeague = function (data) {
    for (let leagueOf of data) {
        let leagueData = new leagueModel({
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