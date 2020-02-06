const desc = "Just a module test command";
const execute = (message, command) => {
  message.channel.send('testy');
}
exports.desc = desc;
exports.execute = execute;
