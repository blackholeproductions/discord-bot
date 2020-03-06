const desc = "Get XP of user",
      args = "<user>";
const execute = (message, command) => {
  var embed = new Discord.RichEmbed();
  var user = message.mentions.users.first() || client.users.find("username", command.getArgs().join(" ")) || message.author;
  var xp = util.xp.getXPGlobal(user.id);
  var level = util.xp.getLevelXP(util.xp.getXPGlobal(user.id));

  embed.setThumbnail(user.displayAvatarURL);
  embed.setTitle(message.guild.members.get(user.id).nickname || user.username);

  embed.setDescription(`XP until Level ${level+1}: ${util.numberWithCommas(util.xp.getMinXP(level+1)-xp)}`);

  embed.addField(`XP`, `**${util.numberWithCommas(xp)}** xp`, true);
  embed.addField(`Level`, `Level ${level}`, true);
  embed.addField(`Rank`, `**#${util.xp.getGlobalLeaderboardRank(user.id)}**`, true);
  message.channel.send(embed);
}
exports.args = args;
exports.desc = desc;
exports.execute = execute;
