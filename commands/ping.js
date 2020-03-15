module.exports = {
  desc: "Ping the bot",
  async execute (message, command) {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${client.ws.ping}ms`)
  }
}
