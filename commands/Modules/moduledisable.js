module.exports = {
  desc: "Disable a module",
  args: "<module name>",
  execute(message, command) {
    var selectedmodule = command.getArgs()[0];
    if (selectedmodule == undefined) { // If the module isn't defined, it's auto-invalid.
      message.channel.send("You have specified an invalid module.");
      return;
    }
    if (modules[selectedmodule] !== undefined) { // Check for server module
      if (message.member.hasPermission("MANAGE_GUILD")) { // Needs permission
        util.modules.disable(selectedmodule, message.guild.id);
        message.channel.send(`Disabled **${selectedmodule}** module`);
      } else {
        message.channel.send(`You don't have permission`);
      }
    } else if (usermodules[selectedmodule] !== undefined) { // Check for user module
      util.modules.disableUser(selectedmodule, message.author.id);
      message.channel.send(`Disabled **${selectedmodule}** user module`);
    } else { // Invalid module
      message.channel.send("You have specified an invalid module.");
    }
  }
}
