const desc = "Sets the current counting value",
      args = "<value>";
const execute = (message, command) => {
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var value = parseInt(command.getArgs()[0]);
    if (isNaN(value)) {
      message.channel.send("You have provided an invalid value.");
      return;
    }
    util.counting.setCount(message.guild.id, value);
    message.channel.send(`Set current count to **${value}**`);
  } else {
    message.channel.send("You do not have permission!");
  }

}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
