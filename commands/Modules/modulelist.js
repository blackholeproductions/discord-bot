const desc = "List the modules",
      args = "<user/server>";
const execute = (message, command) => {
  var type = command.getArgs()[0];
  if (type == undefined || type == "") {
    type = "server";
  }
  var output = "";
  switch (type) {
    case "server":
      output += `Listing server modules:\n`;
      for (selectedmodule in modules) {
        output += `\`${selectedmodule}\` - ${modules[selectedmodule].description} ***${util.modules.isEnabled(selectedmodule, message.guild.id) ? "ENABLED" : "DISABLED"}***\n`;
      }
      break;
    case "user":
      output += `Listing user modules:\n`;
      for (selectedmodule in usermodules) {
        output += `\`${selectedmodule}\` - ${usermodules[selectedmodule].description} ***${util.modules.isEnabledUser(selectedmodule, message.author.id) ? "ENABLED" : "DISABLED"}***\n`;
      }
      break;
    default:
      output += `Invalid type ${type}`;
      break;
  }

  message.channel.send(output);
}
exports.desc = desc;
exports.execute = execute;
