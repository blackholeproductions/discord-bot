const osu = require('node-osu');
const osuApi = new osu.Api(config.osuApiKey, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});
const desc = "Returns user info of a given user";
const execute = (message, command) => {
  if (command.getArgs().length > 0) {
    var u = command.getArgs().join(" ");
    osuApi.getUser({ u: u }).then(user => {
      const embed = new Discord.RichEmbed()
        .setTitle(`${user.name}`)
        .setURL(`https://a.ppy.sh/${user.id}`)
        .setColor(0x00AE86)
        .setDescription(`${user.country}`)
        .addField("**Performance Points**", `${util.numberWithCommas(user.pp.raw)}pp`, true)
        .addField("**Rank**", `#${util.numberWithCommas(user.pp.rank)}`, true)
        .addField("**Country Rank**", `#${util.numberWithCommas(user.pp.countryRank)}`, true)
        .addField("**Level**", `${user.level}`, true)
        .addField("**Accuracy**", `${user.accuracy.substring(0,5)}%`, true)
        .addField("**Hours Played**", `${Math.round(user.secondsPlayed/3600)}`, true)
        .addField("300 Hits", `${util.numberWithCommas(user.counts['300'])}`, true)
        .addField("100 Hits", `${util.numberWithCommas(user.counts['100'])}`, true)
        .addField("50 Hits", `${util.numberWithCommas(user.counts['50'])}`, true)
        .addField("**Plays**", `${util.numberWithCommas(user.counts.plays)}`, true)
        .addField("HD SS", `${user.counts.SSH}`, true)
        .addField("SS", `${user.counts.SS}`, true)
        .addField("HD S", `${user.counts.SH}`, true)
        .addField("S", `${user.counts.S}`, true)
        .addField("A", `${user.counts.A}`, true)
        .addField("Total Score", `${util.numberWithCommas(user.scores.total)}`, true)
        .addField("Ranked Score", `${util.numberWithCommas(user.scores.ranked)}`, true)
        .addField("Unranked Score", `${util.numberWithCommas(user.scores.total-user.scores.ranked)}`, true)
        .setFooter(`ID: ${user.id} Joined: ${user.raw_joinDate}`)
        .setThumbnail(`https://a.ppy.sh/${user.id}`)
        .setTimestamp();
      message.channel.send(embed);
    });
  } else {
    message.channel.send("Not enough arguments");
    return;
  }

}
exports.desc = desc;
exports.execute = execute;
