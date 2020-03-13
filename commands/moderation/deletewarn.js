module.exports = {
  desc: "Delete a warning of a user",
  args: "<user> <index>",
  ex: "deletewarn @xircadia 4",
  permission: "MANAGE_GUILD",
  aliases: ['delwarn'],
  execute(message, command) {
    var user = message.mentions.users.first();
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    var index = parseInt(message.content.substring(message.content.indexOf(`<@!${user.id}>`)+`<@!${user.id}>`.length+1, message.content.length));
    if (isNaN(index)) {
      message.channel.send("You must provide an index");
      return;
    }
    util.warnings.remove(message.guild.id, user.id, index);
    message.channel.send(`Removed at index ${index}`);
  }
}
