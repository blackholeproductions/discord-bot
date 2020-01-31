const desc = "Get a list of commands";
const execute = (message, command) => {
  var draft = "--- **Global commands** ---\n";
  for (var command in commands) {
    draft += `**${util.getServerPrefix(message.guild.id)}${command}** - *${commands[command].desc}*\n`;
  }
  draft += `--- **Server-specific commands** ---\n`;
  var json = util.JSONFromFile(util.getServerJSON(message.guild.id));
  for (str in json.commands) {
    draft += `**${util.getServerPrefix(message.guild.id)}${str}**\n`;
  }
  message.channel.send(draft);
}

exports.desc = desc;
exports.execute = execute;
