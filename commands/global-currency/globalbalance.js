module.exports = {
  desc: "Gets user's global balance",
  args: "<user>",
  aliases: ['globalbal', 'gbal'],
  execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username === command.getArgs().join(" ")) || message.author;
    var amount = util.currency.getGlobal(message.author.id);
    message.channel.send(`*${user.username}* has ${amount} atom${amount !== 1 ? "s" : ""}`);
  }
}
