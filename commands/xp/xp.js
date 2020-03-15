module.exports = {
  desc: "Get XP of user",
  args: "<user>",
  execute(message, command) {
    var embed = new Discord.MessageEmbed();
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" ")) || message.author;
    var xp = util.xp.getXP(user.id, message.guild.id);
    var xpString = util.xp.getXP(user.id, message.guild.id, true);
    var level = util.xp.getLevel(user.id, message.guild.id);
    var nextHighestRole = util.xp.getNextHighestRole(message.guild.id, level);
    var xpGained = util.xp.getXPGained(message.guild.id, user.id, Math.floor((new Date(Date.now()).getTime())/86400000));
    var xpAvg = util.xp.getXPGainedAvg(message.guild.id, user.id, 7);
    embed.setAuthor(`${message.guild.name}`, `${message.guild.iconURL()}`);
    embed.setThumbnail(user.displayAvatarURL());
    embed.setTitle(message.guild.members.cache.get(user.id).nickname || user.username);

    embed.setDescription(`*+${util.general.numberWithCommas(xpGained)} xp* gained today
  *+${util.general.numberWithCommas(xpAvg)} average xp* gained over last week
  *${util.general.numberWithCommas(util.xp.getMinXP(level+1)-xp)} xp* until Level ${level+1} (${Math.round((util.xp.getMinXP(level+1)-xp)/xpAvg)} day${Math.round((util.xp.getMinXP(level+1)-xp)/xpAvg) !== 1 ? "s" : ""})
  ${util.modules.isEnabled("xp-roles", message.guild.id) ? `*${util.general.numberWithCommas(util.xp.getMinimumXPForRole(message.guild.id, nextHighestRole)-xp)} xp* until <@&${nextHighestRole}> ` : ""} (${Math.round((util.xp.getMinimumXPForRole(message.guild.id, nextHighestRole)-xp)/xpAvg)} day${Math.round((util.xp.getMinimumXPForRole(message.guild.id, nextHighestRole)-xp)/xpAvg) !== 1 ? "s" : ""})`);

    embed.addField(`XP`, `**${xpString}** xp`, true);
    embed.addField(`Level`, `Level ${level} ${util.modules.isEnabled("xp-roles", message.guild.id) ? ` <@&${util.xp.getHighestRole(message.guild.id, level)}>` : ""}`, true);
    var rank = util.xp.getLeaderboardRank(message.guild.id, user.id) || 1;
    embed.addField(`Rank`, `**#${rank}**/${user.bot ? util.xp.getTotalRank(message.guild.id, true) : util.xp.getTotalRank(message.guild.id)} ${rank !== 1 ? `(${util.general.numberWithCommas(util.xp.getXPatRank(message.guild.id, rank-1)-xp)} xp to **#${rank-1}**)` : ""}`, true);
    message.channel.send(embed);
  }
}
