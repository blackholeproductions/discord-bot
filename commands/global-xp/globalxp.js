module.exports = {
  desc: "Get XP of user",
  args: "<user>",
  aliases: ["gxp"],
  execute(message, command) {
    var embed = new Discord.MessageEmbed();
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" ")) || message.author;
    var xp = util.xp.getXPGlobal(user.id);
    var level = util.xp.getLevelXP(util.xp.getXPGlobal(user.id));

    embed.setThumbnail(user.displayAvatarURL());
    embed.setTitle(message.guild.members.cache.get(user.id).nickname || user.username);

    embed.setDescription(`XP until Level ${level+1}: ${util.general.numberWithCommas(util.xp.getMinXP(level+1)-xp)}`);

    embed.addField(`XP`, `**${util.general.numberWithCommas(xp)}** xp`, true);
    embed.addField(`Level`, `Level ${level}`, true);
    embed.addField(`Rank`, `**#${util.xp.getGlobalLeaderboardRank(user.id)}**`, true);
    message.channel.send(embed);
  }
}
