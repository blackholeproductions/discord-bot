module.exports = {
  desc: "Divorce your spouse",
  execute(message, command) {
    if (util.marriage.getSpouse(message.guild.id, message.author.id) == undefined) {
      message.channel.send("You can't divorce someone you're not married to.");
      return;
    }
    var spouse = util.marriage.getSpouse(message.guild.id, message.author.id);
    util.marriage.divorce(message.guild.id, message.author.id);
    message.channel.send(`Divorced **${client.users.cache.get(spouse).username}**.`);
  }
}
