module.exports = {
  desc: "Clear your visible role",
  execute(message, command) {
    var name = command.getArgs().join(' ');
    util.xp.removeVisibleRole(message.guild.id, message.author.id); // set role
    message.channel.send(`Your visible role has been cleared.`);
  }
}
