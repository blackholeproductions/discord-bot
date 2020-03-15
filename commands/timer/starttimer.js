module.exports = {
  desc: "Start a timer",
  execute(message, command) {
    util.timers.addTimer(message.author.id);
    message.channel.send('Started timer');
  }
}
