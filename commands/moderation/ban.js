module.exports = {
  desc: "Ban a user",
  args: "<user> <reason>",
  permission: "BAN_MEMBERS",
  execute(message, command) {
    var user = message.mentions.members.first();
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    if (util.moderation.confirmationsEnabled(message.author.id)) {
      util.moderation.setConfirmation(message.author.id, message.guild.id, "ban", { userID: user.id, reason: "Reason"});
      message.channel.send('Confirm? y/n');
    } else {
      util.moderation.ban(message.guild.id, user.id, "Reason");
    }
  }
}
