module.exports = {
  desc: "Sets currency name for the server",
  args: "<currency name>",
  execute(message, command) {
    var name = command.getArgs().join(" ");
    if (message.member.hasPermission("MANAGE_GUILD")) {
      if (name !== undefined) {
        util.currency.setCurrencyName(message.guild.id, name);
        message.channel.send(`Set currency name to ${name}`);
      } else {
        message.channel.send("Not enough arguments");
      }
    } else {
      message.channel.send("You do not have permission.");
    }
  }
}
