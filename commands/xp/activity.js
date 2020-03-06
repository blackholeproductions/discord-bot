const desc = "Get activity history of user",
      args = "<user>";
const execute = async (message, command) => {
  var page = 1;
  var user = client.users.find("username", command.getArgs().join(" ")) || message.mentions.users.first() || message.author;
  if (user == undefined) {
    message.channel.send("You must specify a valid user.");
    return;
  }
  const m = await message.channel.send("Getting activity...");
  m.edit(util.xp.getXPHistory(message.guild.id, user.id, page));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "activity", { id: user.id });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
