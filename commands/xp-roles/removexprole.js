const desc = "Remove xp role",
      args = '"role name or id"';
const execute = (message, command) => {
  var name = message.content.split('"')[1];
  if (message.member.hasPermission("MANAGE_ROLES")) {
    var role;
    if (isNaN(parseInt(name))) {
      role = message.guild.roles.find("name", name); // if it's a string, get by name
      if (role == undefined) { // If role not found tell the user that they are dumb
        message.channel.send("Unable to find role.");
        return;
      }
      util.xp.removeRole(message.guild.id, role.id); // remove role
    } else {
      role = message.guild.roles.get(name); // if it's a number, get by ID
      if (role == undefined) { // If role not found tell the user that they are dumb
        message.channel.send("Unable to find role. Assuming the role has been deleted and proceeding anyway.");
        util.xp.removeRole(message.guild.id, name); // remove role
        return;
      }
      util.xp.removeRole(message.guild.id, role.id); // remove role
    }
    message.channel.send(`Removed role`);
  } else {
    message.channel.send("You do not have permission!");
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
