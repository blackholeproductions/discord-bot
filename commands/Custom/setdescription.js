const desc = "Set a custom command's description",
      args = "<cmdname> <description>";
const execute = (message, command) => {
  if (command.getArgs().length < 2) {
    message.channel.send("You must provide a command and the description to set.");
    return;
  }
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var cmdName = command.getArgs()[0];
    var json = util.json.JSONFromFile(util.json.getServerJSON(message.guild.id));
    var description = command.getArgs().slice(1).join(" ");
    if (description.length > 150) { // Ensure the description isn't too long
      message.channel.send("The description mustn't exceed 150 characters.");
      return;
    }
    if (json.commands[cmdName] != undefined) { // Check if command exists
      util.setCommandDescription(message.guild.id, cmdName, description);
    } else {
      message.channel.send(`Command *${cmdName}* does not exist!`);
    }
  } else {
    message.channel.send("You don't have permission.");
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
