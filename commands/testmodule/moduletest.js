module.exports = {
  desc: "Just a module test command",
  execute(message, command) {
    message.channel.send('testy');
  }
}
