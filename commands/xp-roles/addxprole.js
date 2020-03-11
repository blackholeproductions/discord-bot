module.exports = {
  desc: "Add xp role with level",
  args: '"role name or id" <level_needed>',
  ex: 'addxprole "Member" 3',
  permission: 'MANAGE_ROLES',
  execute(message, command) {
    var name = message.content.split('"')[1];
    var level = message.content.split('"')[2].split(" ")[1];
    if (isNaN(parseInt(level))) {
      message.channel.send("Invalid level");
      return;
    }
    var role;
    if (isNaN(parseInt(name))) {
      role = message.guild.roles.find("name", name); // if it's a string, get by name
    } else {
      role = message.guild.roles.cache.get(name); // if it's a number, get by ID
    }
    if (role == undefined) { // If role not found tell the user that they are dumb
      message.channel.send("Unable to find role.");
      return;
    }
    util.xp.setRole(message.guild.id, role.id, level); // set role
    message.channel.send(`Set role **${role.name}** to level threshold ${level}`);
  }
}
