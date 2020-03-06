const desc = "Ban a user",
      args = "<user> <reason>";
const execute = (message, command) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.channel.send("You do not have permission to perform that action.");
    return;
  }
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

exports.args = args;
exports.desc = desc;
exports.execute = execute;
