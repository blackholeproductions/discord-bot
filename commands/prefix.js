module.exports = {
  desc: "Gets the prefix of the server",
  execute(message, command) {
    message.channel.send(`The prefix for this server is \`${util.general.getServerPrefix(message.guild.id)}\``);
  }
}
