module.exports = {
  desc: "Just a test command (Also the first command ever added)",
  execute(message, command) {
    message.channel.send('testy');
  }
}
