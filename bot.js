function execute(startmsg) {
  global.Discord = require('discord.js');
  global.__basedir = __dirname.replace(/\\/g, "/"); // global variable that stores base directory
  global.datapath = `${__basedir}/data`;
  global.commands = {};
  global.modulecmds = {};
  global.modules = {};
  global.usermodules = {};
  global.config = require(`${__basedir}/config.js`);
  global.util = require(`${__basedir}/util/util.js`);
  global.client = new Discord.Client();
  const path    = require('path'),
        fs      = require('fs'),
        md5     = require('md5');

  var command = require(`${__basedir}/command.js`);
  // Get all .js files recursively in the ./commands/ directory and register them as a command
  var filePath = path.join(__dirname, "commands");

  // Read files and read dir commands for loading commands/modules
  function readFiles(dir, filelist) {
    var files = fs.readdirSync(dir); // Get list of files
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = readFiles(path.join(dir, file), filelist); // For each directory, add the files (and any further directories files) to the list.
      } else {
        filelist.push(path.join(dir, file)); // Pass absolute path into list
      }
    });
    return filelist;
  };
  function readDirectory(dir, directorylist) {
    var files = fs.readdirSync(dir); // Get list of files
    directorylist = directorylist || [];
    files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        directorylist.push(path.join(dir, file)); // Pass absolute path into list
        directorylist = readDirectory(path.join(dir, file), directorylist); // For each directory, add the files (and any further directories files) to the list.
      }
    });
    return directorylist;
  };
  // Load modules & their commands, then load them into modulecmds object.
  readDirectory(filePath).forEach(function(file) {
    if (fs.statSync(file).isDirectory()) { // If the file is a directory
      var selectedmodule = file.replace(/\\/g, "/").split("/")[file.replace(/\\/g, "/").split("/").length-1];
      console.log(selectedmodule);
      if (fs.existsSync(`${file}/module.json`)) { // Check for module.json
        var json = util.json.JSONFromFile(`${file}/module.json`);
        modules[selectedmodule] = {};
        for (var property in json) {
          modules[selectedmodule][property] = json[property];
        }
        console.log(modules[selectedmodule]);
      } else if (fs.existsSync(`${file}/user-module.json`)) { // Check for user-module.json
        var json = util.json.JSONFromFile(`${file}/user-module.json`);
        usermodules[selectedmodule] = {};
        for (var property in json) {
          usermodules[selectedmodule][property] = json[property];
        }
        console.log(usermodules[selectedmodule]);
      }
    }
  });
  console.log(modules);


  // Load global commands, then load them into the commands object.
  readFiles(filePath).filter(file => file.endsWith('.js')).forEach(function(file) {
    var compatFile = file.replace(/\\/g, "/"); // compatFile = compatible with windows because windows is dumb and has \ instead of /!!!!!
    var name = compatFile.split("/")[compatFile.split("/").length-1].split(".")[0]; // Remove directory to get just the command name
    if (fs.existsSync(`${file.split(`${name}.js`)[0]}/module.json`) || fs.existsSync(`${file.split(`${name}.js`)[0]}/user-module.json`)) { // Check for module.json
      modulecmds[name] = require(file);
      modulecmds[name].path = compatFile; // same as below
      modulecmds[name].module = compatFile.split(`${__basedir}/commands/`)[1].split("/")[0]; // set module name to directory name
      if (modulecmds[name].args == undefined) modulecmds[name].args = ""; // same as below
      if (modulecmds[name].ex == undefined) modulecmds[name].ex = ""; // if the command doesn't specify an example, set it to nothing so js doesn't scream undefined at me
      if (modulecmds[name].aliases == undefined) modulecmds[name].aliases = [`${name}`]; // if the command doesn't specify an example, set it to nothing so js doesn't scream undefined at me
      if (!modulecmds[name].aliases.includes(name)) modulecmds[name].aliases.push(name);
    } else {
      commands[name] = require(file);
      commands[name].path = compatFile; // Save the filepath in the command
      if (commands[name].args == undefined) commands[name].args = ""; // if the command doesn't specify arguments, set it to nothing so js doesn't scream undefined at me
      if (commands[name].ex == undefined) commands[name].ex = ""; // if the command doesn't specify an example, set it to nothing so js doesn't scream undefined at me
      if (commands[name].aliases == undefined) commands[name].aliases = [`${name}`];
      if (!commands[name].aliases.includes(name)) commands[name].aliases.push(name);
    }
  });

  console.log(modulecmds);

  console.log(commands); // View registered commands and their function(s) in console

  // On bot start, add the current time of starting & command count to a json file.
  // We do this down here because in order to get the amount of commands, the commands have to be registered
  var timeJsonPath = `${__dirname}/data/bot/starts.json`;
  var timeJson = util.json.JSONFromFile(timeJsonPath);
  timeJson[Date.now()] = startmsg;
  util.json.writeJSONToFile(timeJson, timeJsonPath);

  client.on('ready', () => {
    var startMessage = `**${util.timestamp()}** Logged in as *${client.user.tag}*!\nI'm in ${client.guilds.cache.size} servers with ${client.users.cache.size} users in ${client.channels.cache.size} channels serving ${util.cmdCount()} commands!\nStart message: ${startmsg}`;
    client.guilds.cache.get("587038554539032577").channels.cache.get("612021603261480969").send(startMessage); // send message to bot-brain channel
    // Check all servers the bot is in and see if they have a designated file. If they don't, make one.
    client.guilds.cache.array().forEach((item, i) => {
      var file = `${datapath}/server/${item.id}.json`;
      if (!fs.existsSync(file)) {
        var defaultJson = {
          prefix: config.prefix,
          commands: {
            descriptions: {}
          },
          modules: {}
        }
        util.json.writeJSONToFile(defaultJson, file);
      }
    });
    // Start XP cooldowns
    util.xp.startXPCooldowns();
    util.currency.startCooldowns();
    util.incrementVersion();
    util.timers.startTimers();
  });

  client.on('message', async message => {
    if (message.guild == null) return;
    // COUNTING
    if (util.modules.isEnabled("counting", message.guild.id)) { // Handle counting module
      if (util.counting.isChannel(message.guild.id, message.channel.id)) {
        if (!await util.counting.isValidCount(message.guild.id, message.content, message.author.id)) {
          message.delete({ timeout: 1000 }); // Delete message if it is not valid
        } else {
          if (util.xp.isEnabled(message.guild.id)) {
            util.xp.addXP(message.author.id, message.guild.id, util.xp.getLevel(message.author.id, message.guild.id)); // Add 5 xp for counting
          }
        }
        return;
      }
    }
    // XP
    if (util.xp.isEnabled(message.guild.id)) { // Handle xp module
      if (util.xp.enabledXPGain(message.guild.id, message.channel.id)) { // If xp is enabled in channel
        var levelBefore = util.xp.getLevel(message.author.id, message.guild.id);
        util.xp.addXP(message.author.id, message.guild.id); // Add default xp
        var levelAfter = util.xp.getLevel(message.author.id, message.guild.id);
        if (levelAfter > levelBefore && message.author.id !== client.user.id) {
          message.channel.send(`**${message.member.nickname ? message.member.nickname : message.author.username}** has advanced to level **${levelAfter}**!`);
          util.xp.addLevelUpMessage(message.guild.id, message.channel.id, message.id, message.author.id, levelAfter, message.content);
        }
      }
    }
    // MODERATION
    if (util.modules.isEnabled("moderation", message.guild.id) && util.moderation.hasConfirmation(message.guild.id, message.author.id)) {
      if (message.content == "y") {
        util.moderation.confirm(message.guild.id, message.author.id);
        message.channel.send("Executed");
      } else if (message.content == "n") {
        util.moderation.removeConfirmation(message.guild.id, message.author.id);
        message.channel.send("Removed action")
      }
    }

    // GLOBAL XP
    if (util.modules.isEnabledUser("global-xp")) {
      if (util.xp.enabledXPGain(message.guild.id, message.channel.id)) util.xp.addXPGlobal(message.author.id, message.guild.id);
    }

    // CURRENCY
    if (util.modules.isEnabled("currency", message.guild.id)) { // Handle currency module
      util.currency.add(message.guild.id, message.author.id, 1);
    }

    var prefix = util.getServerPrefix(message.guild.id); // get server prefix
    console.log(`${util.timestamp()} ${message.author.tag} (${message.channel.name}): ${message.content}`); // log message
    // Check if message contains prefix (with the exception of the u!setprefix command)
    if (message.content.startsWith(config.prefix)) { // Check for u!setprefix
      var cmdName = message.content.split(config.prefix)[1].split(" ")[0];
      if (cmdName == "setprefix") {
        command.set(message, config.prefix);
        commands[cmdName].execute(message, command);
      }
    }
    if (message.content.startsWith(prefix)) { // Check for server-specific prefix
      var cmdName = message.content.slice(prefix.length, message.content.length).split(" ")[0];
      // Check if command name is a valid command
      var selectedCommand = util.getCommandFromAlias(cmdName);
      if (selectedCommand != undefined) {
        if (selectedCommand.module != undefined) { // check if command is a module command
          if (util.modules.isEnabled(selectedCommand.module, message.guild.id) || util.modules.isEnabledUser(selectedCommand.module, message.author.id)) { // Check if valid for server or user
            if (!selectedCommand.admin || message.author.id == "218525899535024129") {
              if (selectedCommand.permission == undefined || message.member.hasPermission(selectedCommand.permission)) {
                command.set(message); // same as above
                selectedCommand.execute(message, command);
              } else {
                message.channel.send(`You don't have permission to execute that command. (Need ${selectedCommand.permission} permission)`);
              }
            }
          }
        } else { // Command is normal command
          if (!selectedCommand.admin || message.author.id == "218525899535024129") {
            // Pass to command.js for easier interpreting later
            command.set(message);
            // Run command
            selectedCommand.execute(message, command);
          }
        }

      }
      // Check if command is a server-specific command
      var json = util.json.JSONFromFile(util.json.getServerJSON(message.guild.id));
      if (json.commands[cmdName] != undefined) {
        message.channel.send(json.commands[cmdName]);
      }
    }
  });

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.users.cache.has(client.user.id)) {
      util.pages.handlePages(reaction, user); // Handle reaction menu for pages
    }
  });

  // Create an event listener for new guild members
  client.on('guildMemberAdd', member => {
    if (util.modules.isEnabled("join-leave", member.guild.id)) {
      const channel = util.joinleave.getJoinLeaveChannel(member.guild.id);
      if (!channel) return;
      channel.send(util.joinleave.getJoinMessage(member.guild.id).replace(/<user>/g, member.user.username).replace(/<server>/g, member.guild.name));
    }
  });
  // Create an event listener for new guild members
  client.on('guildMemberRemove', member => {
    if (util.modules.isEnabled("join-leave", member.guild.id)) {
      const channel = util.joinleave.getJoinLeaveChannel(member.guild.id);
      if (!channel) return;
      channel.send(util.joinleave.getLeaveMessage(member.guild.id).replace(/<user>/g, member.user.username).replace(/<server>/g, member.guild.name));
    }
  });
  client.login(config.token);
}
exports.execute = execute;
