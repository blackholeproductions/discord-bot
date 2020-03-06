const desc = "Divorce someone",
      args = "<user>";
const execute = (message, command) => {
  var user = message.mentions.users.first() || client.users.find("username", command.getArgs().join(" "));
  if (!user) {
    message.channel.send("You have specified an invalid user.");
    return;
  }
  if (user.id == message.author.id) {
    message.channel.send("are you that masochistic");
    return;
  }
  if (util.marriage.getSpouse(message.guild.id, message.author.id) == user.id) {
    util.marriage.divorce(message.guild.id, message.author.id, user.id);
    message.channel.send(`Divorced **${user.username}**.`);
  } else {
    message.channel.send("You can't divorce someone who you're not married to.")
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
