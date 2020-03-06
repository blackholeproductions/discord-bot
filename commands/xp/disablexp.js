const desc = "Disable xp in the current channel";
const execute = (message, command) => {
  util.xp.disableXPGain(message.guild.id, message.channel.id);
  message.channel.send("Disabled XP gain in this channel");
} 
exports.desc = desc;
exports.execute = execute;
