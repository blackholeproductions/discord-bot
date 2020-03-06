var name = "", // Current command name
    args = [], // All arguments of current command
    moduleName = "", // Name of module the command is attached to (if any)
    prefix = ""; // prefix of current command

const set = (message, cmdPrefix) => {
  if (cmdPrefix !== undefined) name = message.content.slice(cmdPrefix.length, message.content.length).split(" ")[0];
  else name = message.content.slice(util.getServerPrefix(message.guild.id).length, message.content.length).split(" ")[0];
  prefix = cmdPrefix || util.getServerPrefix(message.guild.id);
  // Check if command has arguments, set args if so
  if (message.content.split(" ").length-1 > 0) {
    args = message.content.substring(getArgsOffset(), message.content.length).split(' ');
  } else args = []; // if not, set it blank
  // Set moduleName variable if the command is a part of a module
  if (modulecmds[name] != undefined) {
    if (util.modules.isEnabled(modulecmds[name].module, message.guild.id)) {
      moduleName = modulecmds[name].module;
    }
  }
  console.log(`${util.timestamp()} ${message.author.username} ran the command ${name}`);
};
const get = () => {
  return `name: ${name}\nargs: ${args} (${args.length})`;
};
const getName = () => {
  return name;
};
const getPrefix = () => {
  return prefix;
};
const getArgs = () => {
  return args;
};
function getArgsOffset() {
  return getName().length+getPrefix().length+1;
}

exports.set = set;
exports.get = get;
exports.getName = getName;
exports.getArgs = getArgs;
exports.getPrefix = getPrefix;
exports.getArgsOffset = getArgsOffset;
