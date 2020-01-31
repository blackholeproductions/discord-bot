const desc = "Get a list of commands";
const execute = (message, command) => {
  var page = command.getArgs()[0];
  if (page == undefined) page = 0;
  var draft = "--- **Global commands** ---\n";
  for (var command in commands) {
    draft += `**${util.getServerPrefix(message.guild.id)}${command}** - *${commands[command].desc}*\n`;
  }
  draft += `--- **Server-specific commands** ---\n`;
  var json = util.JSONFromFile(util.getServerJSON(message.guild.id));
  for (str in json.commands) {
    draft += `**${util.getServerPrefix(message.guild.id)}${str}**\n`;
  }
  if (draft.length < 500) {
    var current = str.match(/.{500}/g)[page];
  }
  message.channel.send(current);
}

exports.desc = desc;
exports.execute = execute;
