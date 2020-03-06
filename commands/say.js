const desc = "Make the bot say something";
const execute = (message, command) => {
  var string = command.getArgs().join(" ");
  if (string.startsWith(util.getServerPrefix(message.guild.id)) && message.author.id != "218525899535024129") {
    message.channel.send("No");
  } else {
    if (string.startsWith(config.prefix)) { message.channel.send("No"); return; }
    if (string.includes("@")) { message.channel.send("No"); return; }
    message.channel.send(string);
    message.delete(1000);
  }
}
exports.desc = desc;
exports.execute = execute;
