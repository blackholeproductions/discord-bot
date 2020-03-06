const desc = "Remove from to-do list",
      args = `<item> "project"`,
      aliases = ["todor"],
      ex = `todoremove 2 "bot"`;
const execute = async (message, command) => {
  var index = command.getArgs()[0],
      project = command.getArgs().join(' ').split('"')[1],
      embed = new Discord.RichEmbed();
  if (project == undefined || project == "") {
    project = "default";
  }
  var item = util.todo.getItem(message.author.id, index, project);
  if (item == undefined) {
    message.channel.send(`That item is not valid`);
    return;
  }
  if (!util.todo.projectExists(message.author.id, "default")) util.todo.createProject(message.author.id, "default");
  if (util.todo.projectExists(message.author.id, project)) {
    if (util.todo.get(message.author.id, item, project) !== undefined) {
      util.todo.remove(message.author.id, item, project);
      embed.setDescription(`Removed *${item}* in project *${project}*`);
    } else {
      embed.setDescription(`That doesn't exist`);
    }
  }
  message.channel.send(embed);
}
exports.ex = ex;
exports.aliases = aliases;
exports.args = args;
exports.desc = desc;
exports.execute = execute;
