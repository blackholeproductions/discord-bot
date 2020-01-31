var name = "", // Current command name
    args = []; // All arguments of current command
    list = {}; // List of all commands in the bot

const set = (message) => {
  name = message.content.split(util.getServerPrefix(message.guild.id))[1].split(" ")[0];
  // Check if command has arguments, set args if so
  if (message.content.split(" ").length-1 > 0) {
    args = message.content.split(name+" ")[1].split(" ");
  }
  console.log(`${util.timestamp()} ${message.author.username} ran the command ${name}`);
};
const get = () => {
  return `name: ${name}\nargs: ${args} (${args.length})`;
};
const getName = () => {
  return name;
}
const getArgs = () => {
  return args;
}
const setList = (list) => {
  this.list = list;
}
const getList = () => {
  return list;
}

exports.set = set;
exports.get = get;
exports.getName = getName;
exports.getArgs = getArgs;
exports.getList = getList;
exports.setList = setList;
