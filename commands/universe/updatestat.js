module.exports = {
  desc: "Update a stat",
  args: "<stat> <value> <user>",
  admin: true,
  execute(message, command) {
    var user = message.mentions.users.first() || message.author;
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    util.stats.updateStat(user.id, command.getArgs()[0], parseInt(command.getArgs()[1]));
  }
}
