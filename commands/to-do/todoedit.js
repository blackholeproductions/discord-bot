const desc = "Edit item in to-do list",
      args = `<index> <new_item> "project"`,
      aliases = ['todoe'],
      ex = `todoedit 4 beep boop bop "bot"`;
const execute = async (message, command) => {
  var index = command.getArgs()[0],
      argsString = command.getArgs().join(' ').substring(index.length+1, command.getArgs().join(' ').length),
      item = util.removeAllBut(argsString, '"', 2), // remove apostrophes except for last 2
      embed = new Discord.RichEmbed();
  var project = item.split(`"`)[1];
  if (item.indexOf('"') !== -1) item = argsString.substring(0, item.indexOf('"')+util.countOccurences(argsString, '"')-2-1); // add countOccurences because the length shortened when the characters were item, and -1 to remove space at the end
  if (project == undefined || project == "") {
    project = "default";
  }
  if (!util.todo.projectExists(message.author.id, "default")) util.todo.createProject(message.author.id, "default");
  if (util.todo.projectExists(message.author.id, project)) {
    if (item !== undefined && item !== "") {
      var oldItem = util.todo.getItem(message.author.id, index, project);
      if (util.todo.isCompleted(message.author.id, oldItem, project)) {
        message.channel.send("That item is already complete");
        return;
      }
      util.todo.setItem(message.author.id, index, item, project);
      embed.setDescription(`Edited *${oldItem}* to *${item}* in project *${project}*`);
    } else {
      embed.setDescription("why are you dumb");
    }
  } else {
    embed.setDescription("That project does not exist");
  }
  message.channel.send(embed);
}
exports.ex = ex;
exports.aliases = aliases;
exports.args = args;
exports.desc = desc;
exports.execute = execute;
