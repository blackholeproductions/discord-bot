const desc = "Get XP leaderboard",
      args = "<page> <bot>";
const execute = async (message, command) => {
  var page = parseInt(command.getArgs().join(' ')) || 1;
  var bot = command.getArgs()[0] == 'bot' || command.getArgs()[1] == 'bot';
  const m = await message.channel.send("Getting leaderboard...");
  m.edit(util.xp.getLeaderboard(message.guild.id, page, bot));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "leaderboard", { bot: bot });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
