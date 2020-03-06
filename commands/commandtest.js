const desc = "Just a test command (Also the first command ever added)";
const execute = (message, command) => {
  message.channel.send('testy');
}
exports.desc = desc;
exports.execute = execute;
