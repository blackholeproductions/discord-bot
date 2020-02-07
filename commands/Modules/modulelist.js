const desc = "List the modules";
const execute = (message, command) => {
  var output = "";
  for (selectedmodule in modules) {
    output += `**${selectedmodule}** - ${modules[selectedmodule].description}\n`;
  }
  message.channel.send(output);
}
exports.desc = desc;
exports.execute = execute;
