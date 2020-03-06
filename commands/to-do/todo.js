const desc = "Get full to-do list of user",
      args = `<user> "project"`;
const execute = async (message, command) => {
  var argsString = command.getArgs().join(' '),
      project = util.removeAllBut(argsString, '"', 2).split('"')[1],
      page = 1,
      user = 0;
  if (project == "" || project == undefined) {
    if (client.users.find("username", command.getArgs().join(" "))) {
      user = client.users.find("username", command.getArgs().join(" "));
    }
    project = "default";
  }
  var username = command.getArgs().join(" ").substring(0, argsString.indexOf('"')-1);
  if (user !== 0 && username !== "") user = message.mentions.users.first() || client.users.find("username", username);
  if (user == 0 && username == "") user = client.users.find("username", argsString);
  if (argsString == `"${project}"` || argsString == "") user = message.author;
  if (user !== 0 && !util.todo.projectExists(user.id, "default")) util.todo.createProject(user.id, "default");
  const m = await message.channel.send(util.todo.getList(user.id, page, project));
  util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "todoList", { id: user.id, project: project });
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
