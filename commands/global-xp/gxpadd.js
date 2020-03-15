module.exports = {
  desc: "Add guild to trusted guild list",
  admin: true,
  execute(message, command) {
    util.xp.addTrusted(message.guild.id);
    message.channel.send("Added to trusted guild list");
  }
}
