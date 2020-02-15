const desc = "Run this command in the channel that you wish to be the counting channel";
const execute = (message, command) => {
  util.counting.setChannel(message.guild.id, message.channel.id);
  message.delete(1000);
  message.author.send("Set channel successfully.");
}
exports.desc = desc;
exports.execute = execute;
