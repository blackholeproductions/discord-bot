const desc = "Run this command for fast leaderboard setup, preferably in an empty channel.";
const execute = async (message, command) => {
  const m = await message.channel.send("Waiting for ID...");
  m.edit(`Do \`${util.getServerPrefix(message.guild.id)}leaderboardset ${m.id} ${m.channel.id}\` to set this as the leaderboard message.`);
}
exports.desc = desc;
exports.execute = execute;
