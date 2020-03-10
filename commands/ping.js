const desc = "Ping the bot";
const execute = async (message, command) => {
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${client.ws.ping}ms`)
}
exports.desc = desc;
exports.execute = execute;
