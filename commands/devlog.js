const desc = "A message is entered every time the bot is started. This is a collection of all those messages.",
      args = "<day> <page>";
const execute = async (message, command) => {
  var day  = command.getArgs()[0],
      page = command.getArgs()[1] || 1;
  const m = await message.channel.send(util.getDevlog(day, page));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "devlog", { day: day });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
