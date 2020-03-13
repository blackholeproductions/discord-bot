module.exports = {
  desc: "Get a list of warnings for a user",
  args: "<user>",
  ex: "warnings @xircadia",
  permission: "MANAGE_GUILD",
  execute(message, command) {
    var user = message.mentions.users.first();
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    message.channel.send(util.warnings.list(message.guild.id, user.id));
  }
}
