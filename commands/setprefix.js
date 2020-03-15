module.exports = {
  desc: "Sets the prefix of the server",
  args: "<prefix>",
  permission: "MANAGE_GUILD",
  execute(message, command) {
    if (command.getArgs().length < 1) {
      message.channel.send("You must provide a prefix for me to set it to.");
      return;
    }
    var prefix = command.getArgs()[0];
    util.general.setServerPrefix(message.guild.id, prefix);
    message.channel.send(`Set prefix to ${prefix}`);
  }
}
