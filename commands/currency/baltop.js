module.exports = {
  desc: "Gets top balances",
  args: `<page>`,
  async execute(message, command) {
    var page = command.getArgs()[0] || 1;
    const m = await message.channel.send("Getting top balances...");
    m.edit(util.currency.topBalances(message.guild.id, page));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "baltop");
  }
}
