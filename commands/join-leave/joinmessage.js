const desc = "Set the join message of your server. Refer to the tutorial of this module for more info.",
      args = "<join message>";
const execute = (message, command) => {
  if (command.getArgs().length > 0) {
    util.joinleave.setJoinMessage(message.guild.id, command.getArgs().join(' '));
    message.channel.send(`Set your join message! Example:\n${util.joinleave.getJoinMessage(message.guild.id).replace(/<user>/g, message.author.username).replace(/<server>/g, message.guild.name)}`);
  } else {
    message.channel.send(`You must give me a join message to set it to.`);
  }
}
exports.args = args;
exports.desc = desc;
exports.execute = execute;
