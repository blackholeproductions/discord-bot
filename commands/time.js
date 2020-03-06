const desc = "Bot time";
const execute = (message, command) => {
  message.channel.send(`Current time: ${util.getDateFormatted(new Date(Date.now()))}`);
}
exports.desc = desc;
exports.execute = execute;
