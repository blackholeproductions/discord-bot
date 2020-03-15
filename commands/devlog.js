module.exports = {
  desc: "A message is entered every time the bot is started. This is a collection of all those messages.",
  args: "<day> <page>",
  async execute(message, command) {
    var day  = command.getArgs()[0],
        page = command.getArgs()[1] || 1;
    const m = await message.channel.send(util.general.getDevlog(page, day));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "devlog", { day: day });
  }
}
