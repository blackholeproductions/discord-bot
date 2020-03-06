const desc = "Enable xp in the current channel (default)";
const execute = (message, command) => {
  util.xp.enableXPGain(message.guild.id, message.channel.id);
  message.channel.send("Enabled XP gain in this channel");
}
exports.desc = desc; 
exports.execute = execute;
