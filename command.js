module.exports = {
  name: "", // Current command name
  args: [], // All arguments of current command
  moduleName: "", // Name of module the command is attached to (if any)
  prefix: "", // prefix of current command
  set(message, cmdPrefix) {
    if (cmdPrefix !== undefined) name = message.content.slice(cmdPrefix.length, message.content.length).split(" ")[0];
    else name = message.content.slice(util.general.getServerPrefix(message.guild.id).length, message.content.length).split(" ")[0];
    prefix = cmdPrefix || util.general.getServerPrefix(message.guild.id);
    // Check if command has arguments, set args if so
    if (message.content.split(" ").length-1 > 0) {
      args = message.content.substring(this.getArgsOffset(), message.content.length).split(' ');
    } else args = []; // if not, set it blank
    // Set moduleName variable if the command is a part of a module
    if (modulecmds[name] != undefined) {
      if (util.modules.isEnabled(modulecmds[name].module, message.guild.id)) {
        moduleName = modulecmds[name].module;
      }
    }
    console.log(`${util.general.timestamp()} ${message.author.username} ran the command ${name}`);
  },
  get() {
    return `name: ${name}\nargs: ${args} (${args.length})`;
  },
  getName() {
    return name;
  },
  getPrefix() {
    return prefix;
  },
  getArgs() {
    return args;
  },
  getArgsOffset() {
    return this.getName().length+this.getPrefix().length+1;
  }
}
