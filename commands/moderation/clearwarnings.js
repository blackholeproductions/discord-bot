module.exports = {
  desc: "Clear the list of warnings for a user",
  args: "<user>",
  ex: "clearwarnings @xircadia",
  permission: "MANAGE_GUILD",
  aliases: ["clearwarns"],
  execute(message, command) {
    var user = message.mentions.users.first();
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    util.warnings.clear(message.guild.id, user.id);
    message.channel.send(`Cleared warnings for ${user.username}`);
  }
}
