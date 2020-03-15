module.exports = {
  desc: "Enable xp in the current channel (default)",
  permission: "MANAGE_GUILD",
  execute(message, command) {
    util.xp.enableXPGain(message.guild.id, message.channel.id);
    message.channel.send("Enabled XP gain in this channel");
  }
}
