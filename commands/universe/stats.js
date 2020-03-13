module.exports = {
  desc: "Get stats",
  execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username === command.getArgs().join(" ")) || message.author;
    message.channel.send(util.stats.getStats(user.id));
  }
}
