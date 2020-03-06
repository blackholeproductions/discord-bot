const desc = "Start a timer";
const execute = (message, command) => {
  util.timers.addTimer(message.author.id);
  message.channel.send('Started timer');
}
exports.desc = desc;
exports.execute = execute;
