module.exports = {
  desc: "Run this command for fast leaderboard setup, preferably in an empty channel.",
  async execute(message, command) {
    const m = await message.channel.send("Waiting for xp update...");
    util.xp.setLeaderboardMessage(m.guild.id, m.channel.id, m.id);
    message.delete({ timeout: 1000 });
  }
}
