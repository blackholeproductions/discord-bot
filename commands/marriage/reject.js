module.exports = {
  desc: "Reject a user",
  args: "<user>",
  execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" "));
    if (!user) {
      message.channel.send("You have specified an invalid user.");
      return;
    }
    if (util.marriage.isProposing(message.guild.id, user.id, message.author.id)) {
      util.marriage.reject(message.guild.id, message.author.id, user.id);
      message.channel.send(`**${message.author.username}** rejected **${user.username}**...`);
    } else {
      message.channel.send("You can't reject someone who hasn't proposed to you.")
    }
  }
}
