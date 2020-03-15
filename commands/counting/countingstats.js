module.exports = {
  desc: "Get counting stats",
  execute(message, command) {
    var counts = util.counting.getCounts(message.guild.id, message.author.id)
    message.channel.send(`You have counted a total of **${counts}** time${counts == 1 ? "" : "s"}`);
  }
}
