const config = require("./config.js");
var name = "",
    args = [];

const set = (message) => {
  name = message.content.split(config.prefix)[1].split(" ")[0];
  // Check if command has arguments, set args if so
  if (message.content.split(" ").length-1 > 0) {
    args = message.content.split(name+" ")[1].split(" ");
  }
  console.log(`${message.author.username} ran the command ${name}`);
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
exports.set = set;
exports.get = get;
exports.getName = getName;
exports.getArgs = getArgs;
