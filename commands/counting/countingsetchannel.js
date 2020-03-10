const desc = "Run this command in the channel that you wish to be the counting channel";
const execute = (message, command) => {
  if (message.member.hasPermission("MANAGE_GUILD")) {
    util.counting.setChannel(message.guild.id, message.channel.id);
    message.delete({ timeout: 1000 });
    message.author.send("Set channel successfully.");
  } else {
    message.channel.send("You do not have permission!");
  }
}
exports.desc = desc;
exports.execute = execute;
