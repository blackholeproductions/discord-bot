const desc = "Ping the bot";
const execute = async (message, command) => {
  const m = await message.channel.send("Ping?");
  m.edit(`pong! latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
}
exports.desc = desc;
exports.execute = execute;
