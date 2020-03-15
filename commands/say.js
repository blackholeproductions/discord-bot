module.exports = {
  desc: "Make the bot say something",
  execute(message, command) {
    var string = command.getArgs().join(" ");
    if (string.startsWith(util.general.getServerPrefix(message.guild.id)) && message.author.id != "218525899535024129") {
      message.channel.send("No");
    } else {
      if (string.startsWith(config.prefix) && message.author.id != "218525899535024129") { message.channel.send("No"); return; }
      if (string.includes("@") && message.author.id != "218525899535024129") { message.channel.send("No"); return; }
      message.channel.send(string);
      message.delete({ timeout: 1000 });
    }
  }
}
