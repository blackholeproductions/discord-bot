const desc = "take a wild guess";
const execute = (message, command) => {
  var path   = util.json.getServerJSON(message.guild.id),
      data   = util.json.JSONFromFile(path),
      embed  = new Discord.MessageEmbed();
      output = "";
  if (data.xp.roles == undefined) data.xp.roles = {}; // Add roles object if it doesn't already exist
  for (var role in data.xp.roles) {
    if (isNaN(role)) continue;
    output += `**${message.guild.roles.cache.get(role) ? `${message.guild.roles.cache.get(role)}` : "Invalid role"}** - Level **${data.xp.roles[role]}**\n`;
  }
  if (output == "") output = "There are no xp roles for this server.";
  embed.setAuthor(`${client.guilds.cache.get(message.guild.id).name}`, `${client.guilds.cache.get(message.guild.id).iconURL()}`);
  embed.setDescription(output);
  message.channel.send(embed);
}
exports.desc = desc;
exports.execute = execute;
