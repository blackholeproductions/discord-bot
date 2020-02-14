const desc = "take a wild guess";
const execute = (message, command) => {
  var path   = util.json.getServerJSON(message.guild.id),
      data   = util.json.JSONFromFile(path),
      output = "";
  if (data.xp.roles == undefined) data.xp.roles = {}; // Add roles object if it doesn't already exist
  for (var role in data.xp.roles) {
    output += `**${message.guild.roles.get(role).name}** - Level *${data.xp.roles[role]}*\n`;
  }
  if (output == "") output = "There are no xp roles for this server.";
  message.channel.send(output);
}
exports.desc = desc;
exports.execute = execute;
