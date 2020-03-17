module.exports = {
  desc: "Get XP leaderboard",
  args: "<page>",
  aliases: ["gleaderboard", "gtop"],
  async execute(message, command) {
    var page = command.getArgs()[0] || 1;
    const m = await message.channel.send(util.xp.getGlobalLeaderboard(page));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "global-leaderboard");
  }
}
