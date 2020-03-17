module.exports = {
  desc: "List all questions",
  args: "<page>",
  permission: "MANAGE_GUILD",
  async execute(message, command) {
    var page = command.getArgs()[0];
    if (!page) page = 1;
    const m = await message.channel.send(util.questions.listQuestions(message.guild.id, page));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "questionsList");
  }
}
