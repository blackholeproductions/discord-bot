const desc = "Create a project",
      args = `<project>`;
const execute = async (message, command) => {
  var page = 1;
  var project = command.getArgs().join(" ");
  if (util.todo.projectExists(message.author.id, project)) {
    message.channel.send("That project already exists");
    return;
  } else {
    util.todo.createProject(message.author.id, project);
    message.channel.send(`Created project **${project}**!`);
  }
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
