module.exports = {
  desc: "Kick a user",
  args: "<user> <reason>",
  permission: "KICK_MEMBERS",
  execute(message, command) {
    var user = message.mentions.members.first();
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    if (util.moderation.confirmationsEnabled(message.author.id)) {
      util.moderation.setConfirmation(message.author.id, message.guild.id, "kick", { userID: user.id, reason: "Reason"});
      message.channel.send('Confirm? y/n');
    } else {
      util.moderation.kick(message.guild.id, user.id, "Reason");
    }
  }
}
