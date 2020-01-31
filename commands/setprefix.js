const desc = "Sets the prefix of the server";
const execute = (message, command) => {
  if (command.getArgs().length != 1) {
    message.channel.send("You must provide a prefix for me to set it to.");
    return;
  }
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var prefix = command.getArgs()[0];
    util.setServerPrefix(message.guild.id, prefix);
    message.channel.send(`Set prefix to ${prefix}`);
  } else {
    message.channel.send('You do not have sufficient permissions. (Need "Manage Server" Permission)');
  }

}
exports.desc = desc;
exports.execute = execute;
