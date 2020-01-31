const desc = "Just a test command";
const execute = (message, command) => {
  message.channel.send('testy');
}
exports.desc = desc;
exports.execute = execute;
