const desc = "Get a list of commands";
      args = "<page OR command name> <server/bot/all> ";

const execute = async (message, command) => {
  var helpType   = command.getArgs()[1],                                                       // second argument
      page       = parseInt(command.getArgs()[0]),                                             // page number
      servercmds = util.json.JSONFromFile(util.json.getServerJSON(message.guild.id)).commands, // list of server commands
      selectedcmd = commands[command.getArgs()[0]] || modulecmds[command.getArgs()[0]];        // if a specific command was specified, this would be the command
  if (selectedcmd !== undefined) {
    message.channel.send(`**${util.getServerPrefix(message.guild.id)}${command.getArgs()[0]} ${selectedcmd.args}** - ${selectedcmd.desc}`);
    return;
  } else if (servercmds[command.getArgs()[0]] !== undefined) {
    message.channel.send(`**${util.getServerPrefix(message.guild.id)}${command.getArgs()[0]}** - ${servercmds.descriptions[command.getArgs()[0]] ? servercmds.descriptions[command.getArgs()[0]] : "No description provided"}`);
    return;
  }
  if (page == undefined) page = 1;
  if (isNaN(page)) page = 1;
  if (page <= 0) page = 1;
  const m = await message.channel.send(util.getHelpMenu(message.guild.id, page, helpType));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "help", { helpType: helpType });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
