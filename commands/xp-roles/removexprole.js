module.exports = {
  desc: "Remove xp role",
  args: '"role name or id"',
  permission: "MANAGE_ROLES",
  execute(message, command) {
    var name = command.getArgs().join(' ');
    var role;
    if (isNaN(parseInt(name))) {
      role = message.guild.roles.cache.find(role => role.name === name); // if it's a string, get by name
      if (role == undefined) { // If role not found tell the user that they are dumb
        message.channel.send("Unable to find role.");
        return;
      }
      util.xp.removeRole(message.guild.id, role.id); // remove role
    } else {
      role = message.guild.roles.cache.get(name); // if it's a number, get by ID
      if (role == undefined) { // If role not found tell the user that they are dumb
        message.channel.send("Unable to find role. Assuming the role has been deleted and proceeding anyway.");
        util.xp.removeRole(message.guild.id, role.id); // remove role
        return;
      }
      util.xp.removeRole(message.guild.id, role.id); // remove role
    }
    message.channel.send(`Removed role`);
  }
}
