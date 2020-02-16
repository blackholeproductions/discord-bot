const desc = "Get XP of user",
      args = "<user>";
const execute = (message, command) => {
  function getMessage(id) {
    var xp = util.xp.getXP(id, message.guild.id);
    var level = util.xp.getLevel(id, message.guild.id);
    var nextHighestRole = util.xp.getNextHighestRole(message.guild.id, level);
    console.log(nextHighestRole);
    return `**${xp}** xp (Level ${level}\
${util.modules.isEnabled("xp-roles", message.guild.id) ? ` <@&${util.xp.getHighestRole(message.guild.id, level)}>` : ""}, \
Rank **#${util.xp.getLeaderboardRank(message.guild.id, id)}**)\nXP until Level ${level+1}: ${util.xp.getMinXP(level+1)-xp}\nXP until <@&${nextHighestRole}>: \
${util.xp.getMinimumXPForRole(message.guild.id, nextHighestRole)-xp}`;
  }

  if (command.getArgs().length > 0) {
    var user = message.mentions.users.first() || client.users.find("username", command.getArgs().join(" "));
    if (user != undefined) {
      message.channel.send(`*${user.username}* has ${getMessage(user.id)}`);
    }
  } else {
    message.channel.send(`You have ${getMessage(message.author.id)}`);
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
