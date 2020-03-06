const desc = "Complete item in to-do list",
      args = `<index> "project"`,
      aliases = ['todoc'],
      ex = `todocomplete 47 "bot"`;
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
      util.todo.complete(message.author.id, item, project);
      embed.setDescription(`Completed *${item}* in project *${project}*`);
    } else {
      embed.setDescription("That doesn't exist");
    }
  }
  message.channel.send(embed);
}
exports.ex = ex;
exports.aliases = aliases;
exports.args = args;
exports.desc = desc;
exports.execute = execute;
