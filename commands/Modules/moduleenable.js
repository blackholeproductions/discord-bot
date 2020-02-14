const desc = "Enable a module in your discord server",
      args = "<module name>";
const execute = (message, command) => {
  var selectedmodule = command.getArgs()[0];
  if (selectedmodule == undefined || modules[selectedmodule] == undefined) { // If the module isn't a valid one, guess what.
    message.channel.send("You have specified an invalid module.");
    return;
  }
  util.modules.enable(selectedmodule, message.guild.id);
  message.channel.send(`Enabled **${selectedmodule}** module! View module commands in ${util.getServerPrefix(message.guild.id)}help`);
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;