const desc = "Get a list of commands";
const execute = (message, command) => {
  var draft = "";
  for (var command in commands) {
    draft += `**${config.prefix}${command}** - *${commands[command].desc}*\n`
  }
  message.channel.send(draft);
}

exports.desc = desc;
exports.execute = execute;
