const desc = "Set the leave message of your server. Refer to the tutorial of this module for more info.",
      args = "<leave message>";
const execute = (message, command) => {
  if (command.getArgs().length > 0) {
    util.joinleave.setLeaveMessage(message.guild.id, command.getArgs().join(' '));
    message.channel.send(`Set your leave message! Example:\n${util.joinleave.getLeaveMessage(message.guild.id).replace(/<user>/g, message.author.username).replace(/<server>/g, message.guild.name)}`);
  } else {
    message.channel.send(`You must give me a leave message to set it to.`);
  }
}
exports.args = args;
exports.desc = desc;
exports.execute = execute;
