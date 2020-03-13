module.exports = {
  desc: "Gets all known users with the given discriminator",
  args: "<discriminator>",
  aliases: ['discrim'],
  execute(message, command) {
    var discriminator = command.getArgs()[0],
        embed = new Discord.MessageEmbed(),
        output = "",
        i = 0;
    if (command.getArgs().length < 1 || isNaN(discriminator) || discriminator > 10000 || discriminator < 0) {
      message.channel.send("Invalid arguments");
      return;
    }
    var users = [];
    for (var user in client.users.cache.array()) {
      if (client.users.cache.array()[user].discriminator == discriminator) {
        users.push(client.users.cache.array()[user]);
      }
    }
    for (var user in users) {
      i++
      if (i < 10) output += `${users[user].tag}\n`;
    }
    embed.setDescription(output);
    message.channel.send(embed);
  }
}
