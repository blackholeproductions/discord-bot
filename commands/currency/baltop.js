const desc = "Gets top balances",
      args = `<page>`;
const execute = async (message, command) => {
  var page = command.getArgs()[0] || 1;
  const m = await message.channel.send("Getting top balances...");
  m.edit(util.currency.topBalances(message.guild.id, page));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "baltop");
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
