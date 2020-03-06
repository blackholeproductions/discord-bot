const desc = "Set the visible role of a user",
      args = '<role name or id>';
const execute = (message, command) => {
  var name = command.getArgs().join(' ');
  var role = message.guild.roles.find("name", name); // if it's a string, get by name
  if (role == undefined) { // If role not found tell the user that they are dumb
    message.channel.send("Unable to find role.");
    return;
  }
  util.xp.setVisibleRole(message.guild.id, message.author.id, role.id); // set role
  message.channel.send(`Set your visible role to ${role.name}`);
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
