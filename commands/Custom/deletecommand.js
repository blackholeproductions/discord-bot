const desc = "Delete a custom command";
const execute = (message, command) => {
  if (command.getArgs().length != 1) {
    message.channel.send("You must provide a command to delete.");
    return;
  }
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var cmdName = command.getArgs()[0];
    var json = util.JSONFromFile(util.getServerJSON(message.guild.id));
    if (json.commands[cmdName] != undefined) { // Check if command exists
      util.deleteCommand(message.guild.id, cmdName);
      message.channel.send(`Deleted command *${cmdName}*`);
    } else {
      message.channel.send(`Command *${cmdName}* does not exist!`);
    }

  }
}
exports.desc = desc;
exports.execute = execute;
