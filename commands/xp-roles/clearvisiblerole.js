const desc = "Clear your visible role";
const execute = (message, command) => {
  var name = command.getArgs().join(' ');
  util.xp.removeVisibleRole(message.guild.id, message.author.id); // set role
  message.channel.send(`Your visible role has been cleared.`);
}

exports.desc = desc;
exports.execute = execute;
