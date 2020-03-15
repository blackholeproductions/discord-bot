module.exports = {
  desc: "Gets global top balances",
  args: `<page>`,
  aliases: ["gbalancetop", "globalbaltop", "gbaltop"],
  async execute(message, command) {
    var page = command.getArgs()[0] || 1;
    const m = await message.channel.send("Getting global top balances...");
    m.edit(util.currency.topGlobalBalances(page));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "gbaltop");
  }
}
