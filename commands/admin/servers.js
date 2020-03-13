module.exports = {
  desc: "Get all the servers that this bot is a part of",
  admin: true,
  execute(message, command) {
    var embed = new Discord.MessageEmbed(),
        output = "";
    for (var index in client.guilds.cache.array()) {
      var guild = client.guilds.cache.array()[index];
      output += `**${guild.name}** owned by <@${guild.ownerID}>: ${guild.memberCount} members\n`;
    }
    embed.setDescription(output);
    message.channel.send(embed);
  }
}
