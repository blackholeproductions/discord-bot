module.exports = {
  desc: "Stop a timer",
  execute(message, command) {
    var time = util.timers.removeTimer(message.author.id);
    message.channel.send(`Timer ended. ${time/1000} seconds elapsed`);
  }
}
