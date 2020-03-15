module.exports = {
  desc: "Accept a marriage request from a user",
  args: "<user>",
  execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" "));
    if (!user) {
      message.channel.send("You have specified an invalid user.");
      return;
    }
    if (user.id == message.author.id) {
      message.channel.send("are you that lonely");
      return;
    }
    if (util.marriage.isProposing(message.guild.id, user.id, message.author.id)) {
      util.marriage.accept(message.guild.id, message.author.id, user.id);
      message.channel.send(`Accepted marriage proposal from **${user.username}**. Congratulations, you are now married!`);
    } else {
      message.channel.send("You can't accept a proposal from someone who hasn't proposed.")
    }
  }
}
