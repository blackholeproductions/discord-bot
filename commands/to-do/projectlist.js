const desc = "Get full project list of user",
      args = `<user>`;
const execute = async (message, command) => {
  var page = 1;
  var project = command.getArgs().join(" ").split(`"`)[1] || "default";
  var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" ").split(`"${project}"`)[0]) || message.author;
  if (!util.todo.projectExists(user.id, "default")) util.todo.createProject(user.id, "default");
  const m = await message.channel.send(util.todo.projectList(user.id, page));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "todoProjectList", { id: user.id });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
