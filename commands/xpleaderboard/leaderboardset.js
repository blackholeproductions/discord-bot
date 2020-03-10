const desc = "Set the message ID for the leaderboard",
      args = "<messageid> <channelid>";
const execute = (message, command) => {
  var messageid = command.getArgs()[0],
      channelid = command.getArgs()[1];

  if (command.getArgs().length !== 2) {
    message.channel.send("You have specified an invalid number of arguments");
    return;
  } else {
    client.guilds.cache.get(message.guild.id).channels.cache.get(channelid).messages.fetch(messageid)
      .then(msg => util.xp.setLeaderboardMessage(msg.guild.id, msg.channel.id, msg.id))
      .catch(`Error setting leaderboard in ${message.guild.id}`);
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
