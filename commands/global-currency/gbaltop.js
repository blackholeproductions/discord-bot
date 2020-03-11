const desc = "Gets global top balances",
      args = `<page>`;
const execute = async (message, command) => {
  var page = command.getArgs()[0] || 1;
  const m = await message.channel.send("Getting global top balances...");
  m.edit(util.currency.topGlobalBalances(page));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "gbaltop");
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
