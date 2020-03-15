const osu = require('node-osu');
const osuApi = new osu.Api(config.osuApiKey, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});
module.exports = {
  desc: "Returns user info of a given user",
  args: "<user>",
  execute(message, command) {
    if (command.getArgs().length > 0) {
      var u = command.getArgs().join(" ");
      osuApi.getUser({ u: u }).then(user => {
        const embed = new Discord.MessageEmbed()
          .setTitle(`${user.name}`)
          .setURL(`https://a.ppy.sh/${user.id}`)
          .setColor(0x00AE86)
          .setDescription(`${user.country}`)
          .addField("**Performance Points**", `${util.general.numberWithCommas(user.pp.raw)}pp`, true)
          .addField("**Rank**", `#${util.general.numberWithCommas(user.pp.rank)}`, true)
          .addField("**Country Rank**", `#${util.general.numberWithCommas(user.pp.countryRank)}`, true)
          .addField("**Level**", `${user.level}`, true)
          .addField("**Accuracy**", `${user.accuracy.substring(0,5)}%`, true)
          .addField("**Hours Played**", `${Math.round(user.secondsPlayed/3600)}`, true)
          .addField("300 Hits", `${util.general.numberWithCommas(user.counts['300'])}`, true)
          .addField("100 Hits", `${util.general.numberWithCommas(user.counts['100'])}`, true)
          .addField("50 Hits", `${util.general.numberWithCommas(user.counts['50'])}`, true)
          .addField("**Plays**", `${util.general.numberWithCommas(user.counts.plays)}`, true)
          .addField("HD SS", `${user.counts.SSH}`, true)
          .addField("SS", `${user.counts.SS}`, true)
          .addField("HD S", `${user.counts.SH}`, true)
          .addField("S", `${user.counts.S}`, true)
          .addField("A", `${user.counts.A}`, true)
          .addField("Total Score", `${util.general.numberWithCommas(user.scores.total)}`, true)
          .addField("Ranked Score", `${util.general.numberWithCommas(user.scores.ranked)}`, true)
          .addField("Unranked Score", `${util.general.numberWithCommas(user.scores.total-user.scores.ranked)}`, true)
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
}
