const desc = "Stop a timer";
const execute = (message, command) => {
  var time = util.timers.removeTimer(message.author.id);
  message.channel.send(`Timer ended. ${time/1000} seconds elapsed`);
}
exports.desc = desc;
exports.execute = execute;
