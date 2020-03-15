module.exports = {
  desc: "Delete a custom command",
  args: "<cmdname>",
  aliases: ['deletecmd', 'delcmd'],
  execute(message, command) {
    if (command.getArgs().length != 1) {
      message.channel.send("You must provide a command to delete.");
      return;
    }
    if (message.member.hasPermission("MANAGE_GUILD")) {
      var cmdName = command.getArgs()[0];
      var json = util.json.JSONFromFile(util.json.getServerJSON(message.guild.id));
      if (json.commands[cmdName] != undefined) { // Check if command exists
        util.general.deleteCommand(message.guild.id, cmdName);
        message.channel.send(`Deleted command *${cmdName}*`);
      } else {
        message.channel.send(`Command *${cmdName}* does not exist!`);
      }
    } else {
      message.channel.send("You don't have permission.");
    }
  }
}
