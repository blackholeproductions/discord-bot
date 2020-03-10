const desc = "Get help for a module",
      args = "<module name>";
const execute = (message, command) => {
  var selectedmodule = command.getArgs()[0];
  if (selectedmodule == undefined) { // If the input isn't defined, it's auto-invalid.
    message.channel.send("You have specified an invalid module.");
    return;
  }
  if (modules[selectedmodule] !== undefined || usermodules[selectedmodule] !== undefined) { // Check if module is valid
    message.channel.send(util.modules.property(selectedmodule, "tutorial", message.guild.id));
  } else {
    message.channel.send("That module does not exist");
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
