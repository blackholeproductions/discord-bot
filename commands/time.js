module.exports = {
  desc: "Bot time",
  execute(message, command) {
    message.channel.send(`Current time: ${util.general.getDateFormatted(new Date(Date.now()))}`);
  }
}
