module.exports = {
  desc: "Get current marriage status of a user",
  args: "<user>",
  execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" ")) || message.author;
    var spouse = message.guild.members.cache.get(util.marriage.getSpouse(message.guild.id, user.id));
    if (util.marriage.getSpouse(message.guild.id, user.id) !== undefined && spouse == undefined) { // If user is no longer in server
      message.channel.send("Your spouse left you forever.");
      return;
    }
    if (util.marriage.getSpouse(message.guild.id, user.id) !== undefined) message.channel.send(`${message.author.id == user.id ? "You are" : `${user.username} is`} married to **${spouse.user.username}**.`);
    if (util.marriage.getSpouse(message.guild.id, user.id) == undefined) message.channel.send(`${message.author.id == user.id ? "You are" : `${user.username} is`} not married. Sad.`);
  }
}
