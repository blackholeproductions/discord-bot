const desc = "Set a custom command to say whatever you want",
      args = "<cmdname> <response>";
const execute = (message, command) => {
  if (command.getArgs().length < 2) {
    message.channel.send("You must provide a command and the text to output.");
    return;
  }
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var cmdName = command.getArgs()[0];
    if (cmdName.length > 50) { // Ensure the command name isn't too long
      message.channel.send("The command name mustn't exceed 50 characters.");
      return;
    }
    if (cmdName in commands) { // Check if command is a bot command
      message.channel.send("That command name conflicts with a bot command that already exists.");
    } else if (cmdName in modulecmds) { // Also check if command is a module command
      message.channel.send("That command name conflicts with a module command that already exists.");
    } else {
      util.addCommand(message.guild.id, cmdName, command.getArgs().slice(1).join(" "));
      message.channel.send(`Created command **${cmdName}**. Do ${util.json.getServerPrefix(message.guild.id)}setdescription <command> <description> to change the description of the command so that it shows properly in the help menu.`);
    }
  } else {
    message.channel.send("You don't have permission.");
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
