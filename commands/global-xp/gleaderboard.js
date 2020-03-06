const desc = "Get XP leaderboard",
      args = "<page>";
const execute = async (message, command) => {
  var page = command.getArgs()[0] || 1;
  const m = await message.channel.send("Getting leaderboard...");
  m.edit(util.xp.getGlobalLeaderboard(page));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "global-leaderboard");
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
