module.exports = {
  desc: "Get a list of commands",
  args: "<page OR command name OR module name> <server/bot/all> ",
  async execute(message, command) {
    var helpType    = command.getArgs()[1],                                                       // second argument
        page        = parseInt(command.getArgs()[0]),                                             // page number
        servercmds  = util.json.JSONFromFile(util.json.getServerJSON(message.guild.id)).commands, // list of server commands
        mod         = "";
        selectedcmd = commands[command.getArgs()[0]] || modulecmds[command.getArgs()[0]];        // if a specific command was specified, this would be the command
    if (modules[command.getArgs()[0]] !== undefined || usermodules[command.getArgs()[0]] !== undefined) mod = command.getArgs()[0];
    if (selectedcmd !== undefined && mod == "") {
      message.channel.send(`**${util.general.getServerPrefix(message.guild.id)}${command.getArgs()[0]} ${selectedcmd.args}** - ${selectedcmd.desc}`);
      return;
    } else if (servercmds[command.getArgs()[0]] !== undefined && mod == "") {
      message.channel.send(`**${util.general.getServerPrefix(message.guild.id)}${command.getArgs()[0]}** - ${servercmds.descriptions[command.getArgs()[0]] ? servercmds.descriptions[command.getArgs()[0]] : "No description provided"}`);
      return;
    }
    if (page == undefined) page = 1;
    if (isNaN(page)) page = 1;
    if (page <= 0) page = 1;

    const m = await message.channel.send(util.general.getHelpMenu(message.guild.id, message.author.id, page, helpType, mod))
      .then(m => {
        util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "help", { helpType: helpType, mod: mod, guild: message.guild.id });
        message.react(client.guilds.cache.get(config.mainServerID).emojis.cache.get("685345301116223521")).catch(console.error);
      })
      .catch(console.error);
      /*async () => {
        const m = await message.channel.send(util.general.getHelpMenu(message.guild.id, message.author.id, page, helpType, mod))
        util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "help", { helpType: helpType, mod: mod, guild: message.guild.id });
        message.react(client.guilds.cache.get(config.mainServerID).emojis.cache.get("685345301116223521")).catch(console.error);
      }*/
    }
}
