module.exports = {
  desc: "Get game json of user",
  args: "<user>",
  admin: true,
  execute(message, command) {
    var user = message.mentions.users.first() || message.author;
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    var path = util.json.getUserJSON(user.id);
    var data = util.json.JSONFromFile(path);
    message.channel.send(`\`\`\`${JSON.stringify(data.game, null, 2)}\`\`\``)
  }
}
