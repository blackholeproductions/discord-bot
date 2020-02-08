const desc = "Get XP of user",
      args = "<user>";
const execute = (message, command) => {
  if (command.getArgs().length > 0) {
    var user = message.mentions.users.first();
    if (user != undefined) {
      message.channel.send(`*${user.username}* has **${util.xp.getXP(user.id, message.guild.id)}** xp (Level ${util.xp.getLevel(user.id, message.guild.id)})`);
    }
  } else {
    message.channel.send(`You have **${util.xp.getXP(message.author.id, message.guild.id)}** xp (Level ${util.xp.getLevel(message.author.id, message.guild.id)})`);
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
