module.exports = {
  desc: "Disable xp in the current channel",
  permission: "MANAGE_GUILD",
  execute(message, command) {
    util.xp.disableXPGain(message.guild.id, message.channel.id);
    message.channel.send("Disabled XP gain in this channel");
  }
}
