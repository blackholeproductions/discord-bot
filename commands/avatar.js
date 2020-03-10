module.exports = {
  desc: "Get a user's avatar",
  args: "<user>",
  ex: "avatar xircadia",
  aliases: ['pfp'],
  execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" ")) || message.author;
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    var embed = new Discord.MessageEmbed()
    .setTitle(user.tag)
    .setImage(user.avatarURL({ size: 2048 }));
    message.channel.send(embed);
  }
}
