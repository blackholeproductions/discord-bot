const desc = "Get activity history of user",
      args = '<user> "page"';
const execute = async (message, command) => {
  var path = util.json.getServerJSON(message.guild.id),
      data = util.json.JSONFromFile(path),
      removed = util.removeAllBut(command.getArgs().join(" "), '"', 2),
      page = removed.split('"')[1] || 1,
      name = command.getArgs().join(" ");
  var user = client.users.cache.find(user => user.username ===  name.substring(0, removed.split(`"${page}"`)[0].length)) || message.mentions.users.first() || message.author;
  var m = await message.channel.send(util.xp.formatLevelUpMessages(message.guild.id, user.id, page));
  util.pages.addPageMessage(m.id, message.channel.id, message.author.id, page, "levelUpMessages", { user: user });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
