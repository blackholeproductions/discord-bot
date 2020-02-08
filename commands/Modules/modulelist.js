const desc = "List the modules";
const execute = (message, command) => {
  var output = "";
  for (selectedmodule in modules) {
    output += `\`${selectedmodule}\` - ${modules[selectedmodule].description} ***${util.modules.isEnabled(selectedmodule, message.guild.id) ? "ENABLED" : "DISABLED"}***\n`;
  }
  message.channel.send(output);
}
exports.desc = desc;
exports.execute = execute;
