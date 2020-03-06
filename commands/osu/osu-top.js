const osu = require('node-osu');
const osuApi = new osu.Api(config.osuApiKey, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});
const desc = "Returns user info of a given user";
const execute = (message, command) => {
  if (command.getArgs().length > 0) {
    var u = command.getArgs().join(" ");
    var output = "";
    var embed = new Discord.RichEmbed();
    osuApi.getUserBest({ u: u }).then(scores => {
      osuApi.getUser({ u: u }).then(user => {
        embed.setTitle(`${user.name}'s Top Plays`)
          .setURL(`https://a.ppy.sh/${user.id}`)
          .setColor(0x00AE86)
          .setThumbnail(`https://a.ppy.sh/${user.id}`)
          .setTimestamp();
        for (var i = 0; i < 5; i++) {
          if (scores[i] == undefined) break;
          var name = scores[i].beatmap.title;
          var difficulty = scores[i].beatmap.version;
          var beatmapCombo = scores[i].beatmap.maxCombo;
          var starRating = scores[i].beatmap.difficulty.rating;
          var perfect = scores[i].counts['300'];
          var ok = scores[i].counts['100'];
          var bad = scores[i].counts['50'];
          var miss = scores[i].counts.miss;
          var accuracy = ((50*bad+100*ok+300*perfect)/(300*miss+300*bad+300*ok+300*perfect))*100;
          output += `${i+1}. ${name} [${difficulty}] ${starRating.toString().substring(0,4)}✰ - ${accuracy.toString().substring(0,6)}% ${scores[i].rank}, **${scores[i].pp}pp**\n`;
        }
        embed.setDescription(output);
        message.channel.send(embed);
      });

    });
  } else {
    message.channel.send("Not enough arguments");
    return;
  }

}
exports.desc = desc;
exports.execute = execute;
