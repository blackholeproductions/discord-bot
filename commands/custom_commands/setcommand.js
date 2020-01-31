const desc = "Set a custom command to say whatever you want";
const execute = (message, command) => {
  if (command.getArgs().length < 2) {
    message.channel.send("You must provide a command and the text to output.");
    return;
  }
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var cmdName = command.getArgs()[0];
    if (cmdName in command.getList()) { // Check if command is a bot command
      message.channel.send("That command name conflicts with one that already exists.");
    } else {
      util.addCommand(message.guild.id, cmdName, command.getArgs().slice(1).join(" "));
      message.channel.send(`Created command **${cmdName}**`);
    }
  }
}
exports.desc = desc;
exports.execute = execute;
