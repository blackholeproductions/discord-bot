module.exports = {
  desc: "Get XP leaderboard",
  args: "<page> <bot>",
  aliases: ["top"],
  async execute(message, command) {
    var page = parseInt(command.getArgs().join(' ')) || 1;
    var bot = command.getArgs()[0] == 'bot' || command.getArgs()[1] == 'bot';
    const m = await message.channel.send(util.xp.getLeaderboard(message.guild.id, page, bot));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "leaderboard", { bot: bot });
  }
}
