module.exports = {
  desc: "Warn a user",
  args: "<user> <warning>",
  ex: "warn @xircadia being dumb",
  permission: "MANAGE_GUILD",
  execute(message, command) {
    var user = message.mentions.users.first();
    if (!user) {
      message.channel.send("Invalid user");
      return;
    }
    var warning = message.content.substring(message.content.indexOf(`<@!${user.id}>`)+`<@!${user.id}>`.length+1, message.content.length);
    if (warning == "") {
      message.channel.send("You must provide a reason");
      return;
    }
    util.warnings.add(message.guild.id, user.id, warning);
    user.send(`You have been warned in ${message.guild.name} for: ${warning}`)
      .catch(console.error);
    message.channel.send(`Warned ${user.username} for ${warning}`);
  }
}
