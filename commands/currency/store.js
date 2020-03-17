module.exports = {
  desc: "List the items in the server's store",
  args: "<page>",
  aliases: ["shop"],
  async execute(message, command) {
    var page = command.getArgs()[0] || 1;
    const m = await message.channel.send(util.currency.listStoreItems(message.guild.id, page));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "serverStoreItems");
  }
}
