const desc = "Propose to a user",
      args = "<user>";
const execute = (message, command) => {
  var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" "));
  if (!user) {
    message.channel.send("You have specified an invalid user.");
    return;
  }
  if (user.id == message.author.id) {
    message.channel.send("are you that lonely");
    return;
  }
  if (util.marriage.getSpouse(message.guild.id, message.author.id) !== user.id) {
    if (util.marriage.getSpouse(message.guild.id, message.author.id) !== "") {
      if (util.marriage.getSpouse(message.guild.id, user.id) == undefined) {
        util.marriage.propose(message.guild.id, message.author.id, user.id);
        message.channel.send(`**${message.author.username}** has proposed to **${user.username}**...`);
      } else {
        message.channel.send("They are already married.");
      }

    } else {
      message.channel.send("wtf cheater?");
    }
  } else {
    message.channel.send("You can't propose to someone who you're already married to.")
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
