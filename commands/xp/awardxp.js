const desc = "Award XP to user (use wisely)",
      args = "<amount> <user>";
const execute = (message, command) => {
  if (command.getArgs().length > 1) {
    var user = message.mentions.users.first();
    var amount = parseInt(command.getArgs()[0]);
    if (isNaN(amount)) {
      message.channel.send("lol are you dumb");
      return;
    }
    if (user != undefined) {
      util.xp.addXP(user.id, message.guild.id, amount);
      message.channel.send(`*${user.username}* now has **${util.xp.getXP(user.id, message.guild.id)}** xp (Level ${util.xp.getLevel(user.id, message.guild.id)})`);
    }
  } else {
    util.xp.addXP(message.author.id, message.guild.id, amount);
    message.channel.send(`You now have **${util.xp.getXP(message.author.id, message.guild.id)}** xp (Level ${util.xp.getLevel(message.author.id, message.guild.id)})`);
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
