module.exports = {
  desc: "Get activity history of user",
  args: "<user>",
  async execute(message, command) {
    var page = 1;
    var user = client.users.cache.find(user => user.username ===  command.getArgs().join(" ")) || message.mentions.users.first() || message.author;
    if (user == undefined) {
      message.channel.send("You must specify a valid user.");
      return;
    }
    const m = await message.channel.send(util.xp.getXPHistory(message.guild.id, user.id, page));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "activity", { id: user.id });
  }
}
