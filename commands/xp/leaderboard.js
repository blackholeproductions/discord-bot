const desc = "Get XP leaderboard",
      args = "<page>";
const execute = (message, command) => {
  var page = command.getArgs()[0] || 1;
  message.channel.send(util.xp.getLeaderboard(message.guild.id), page);
}
exports.desc = desc;
exports.execute = execute;
