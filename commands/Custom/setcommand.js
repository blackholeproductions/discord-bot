const desc = "Set a custom command to say whatever you want";
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
    } else if (cmdName == "servercmds") { // Used for listing server commands in help command
      message.channel.send("That command name is reserved.");
      return;
    }
    if (cmdName in commands) { // Check if command is a bot command
      message.channel.send("That command name conflicts with one that already exists.");
    } else {
      util.addCommand(message.guild.id, cmdName, command.getArgs().slice(1).join(" "));
      message.channel.send(`Created command **${cmdName}**. Do ${util.getServerPrefix(message.guild.id)}setdescription <command> <description> to change the description of the command so that it shows properly in the help menu.`);
    }
  }
}
exports.desc = desc;
exports.execute = execute;
