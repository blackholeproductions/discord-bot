const desc = "Get activity history of user",
      args = "<user>";
const execute = (message, command) => {
  var path = util.json.getServerJSON(message.guild.id),
      data = util.json.JSONFromFile(path),
      output = "";

  var user = client.users.find("username", command.getArgs().join(" ")) || message.mentions.users.first() || message.author;
  if (user == undefined) {
    message.channel.send("You must specify a valid user.");
    return;
  }
  if (data.xp.history == undefined) data.xp.history = {}; // if server doesn't have xp history yet, add it so js doesn't scream undefined
  for (var day in data.xp.history) {
    var xp = data.xp.history[day][user.id] || 0;
    if (xp != 0) output += `*${new Date(day*86400000+86400000).toLocaleDateString("en-US")}*: ${xp} xp gained\n`;
  }
  message.channel.send(output);
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
