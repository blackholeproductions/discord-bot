const desc = "Get current marriage status of a user",
      args = "<user>";
const execute = (message, command) => {
  var user = message.mentions.users.first() || client.users.find("username", command.getArgs().join(" ")) || message.author;
  var spouse = message.guild.members.get(util.marriage.getSpouse(message.guild.id, user.id));
  if (util.marriage.getSpouse(message.guild.id, user.id) !== undefined && spouse == undefined) { // If user is no longer in server
    message.channel.send("Your spouse left you forever.");
    return;
  }
  if (util.marriage.getSpouse(message.guild.id, user.id) !== undefined) message.channel.send(`${message.author.id == user.id ? "You are" : `${user.username} is`} married to **${spouse.user.username}**.`);
  if (util.marriage.getSpouse(message.guild.id, user.id) == undefined) message.channel.send(`${message.author.id == user.id ? "You are" : `${user.username} is`} not married. Sad.`);
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
