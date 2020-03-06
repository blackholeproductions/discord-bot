const desc = "Add to to-do list",
      args = `<item> "project"`;
const execute = async (message, command) => {
  var argsString = command.getArgs().join(' '),
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
      util.todo.add(message.author.id, item, project);
      embed.setDescription(`Added *${item}* to project *${project}*`);
    } else {
      embed.setDescription("why are you dumb");
    }
  } else {
    embed.setDescription("That project does not exist");
  }
  message.channel.send(embed);
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
