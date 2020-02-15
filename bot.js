function execute(startmsg) {
  const Discord = require('discord.js');
  global.__basedir = __dirname; // global variable that stores base directory
  global.datapath = `${__basedir}/data`;
  global.commands = {};
  global.modulecmds = {};
  global.modules = {};
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
      if (fs.existsSync(`${file}/module.json`)) { // Check for module.json
        var selectedmodule = file.split("/")[file.split("/").length-1];
        console.log(selectedmodule);
        modules[selectedmodule] = {};
        modules[selectedmodule].description = util.json.JSONFromFile(`${file}/module.json`).description;
        console.log(modules[selectedmodule]);
      }
    }
  });
  console.log(modules);


  // Load global commands, then load them into the commands object.
  readFiles(filePath).filter(file => file.endsWith('.js')).forEach(function(file) {
    var name = file.split("/")[file.split("/").length-1].split(".")[0]; // Remove directory to get just the command name
    if (fs.existsSync(`${file.split(`${name}.js`)[0]}/module.json`)) { // Check for module.json
      modulecmds[name] = require(file);
      modulecmds[name].path = file; // same as below
      modulecmds[name].module = file.split(`${__basedir}/commands/`)[1].split("/")[0]; // set module name to directory name
      if (modulecmds[name].args == undefined) modulecmds[name].args = ""; // same as below
    } else {
      commands[name] = require(file);
      commands[name].path = file; // Save the filepath in the command
      if (commands[name].args == undefined) commands[name].args = ""; // if the command doesn't specify arguments, set it to nothing so js doesn't scream undefined at me
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
    var startMessage = `**${util.timestamp()}** Logged in as *${client.user.tag}*!\nI'm in ${client.guilds.size} servers with ${client.users.size} users in ${client.channels.size} channels serving ${util.cmdCount()} commands!`;
    client.guilds.get("587038554539032577").channels.get("612021603261480969").send(startMessage); // send message to bot-brain channel
    // Check all servers the bot is in and see if they have a designated file. If they don't, make one.
    client.guilds.array().forEach((item, i) => {
      var file = `${datapath}/server/${item.id}.json`;
      if (!fs.existsSync(file)) {
        var defaultJson = {
          prefix: config.prefix,
          commands: {
            descriptions: {}
          },
          modules: {}
        }
        util.writeJSONToFile(defaultJson, file);
      }
    });
    // Start XP cooldowns
    util.xp.startXPCooldowns();
  });

  client.on('message', message => {
    if (message.guild == null) return;
    if (util.modules.isEnabled("counting", message.guild.id)) { // Handle counting module
      if (util.counting.isChannel(message.guild.id, message.channel.id)) {
        if (!util.counting.isValidCount(message.guild.id, parseInt(message.content), message.author.id)) {
          message.delete(1000); // Delete message if it is not valid
        } else {
          util.counting.count(message.guild.id, message.author.id); // Add to count if it is valid
          if (util.xp.isEnabled(message.guild.id)) {
            util.xp.addXP(message.author.id, message.guild.id, 5); // Add 5 xp for counting
          }
        }
        return;
      }
    }
    if (util.xp.isEnabled(message.guild.id)) {
      var levelBefore = util.xp.getLevel(message.author.id, message.guild.id);
      util.xp.addXP(message.author.id, message.guild.id); // Add default xp
      var levelAfter = util.xp.getLevel(message.author.id, message.guild.id);
      if (levelAfter > levelBefore) {
        message.channel.send(`**${message.author.username}** has advanced to level **${levelAfter}**!`);
      }
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
      var cmdName = message.content.split(prefix)[1].split(" ")[0];
      // Check if command name is a valid command
      if (commands[cmdName] != undefined) {
        // Pass to command.js for easier interpreting later
        command.set(message);
        // Run command
        commands[cmdName].execute(message, command);
      }
      // Check if command is a module command
      if (modulecmds[cmdName] != undefined) {
        if (util.modules.isEnabled(modulecmds[cmdName].module, message.guild.id)) {
          command.set(message); // same as above
          modulecmds[cmdName].execute(message, command);
        }
      }
      // Check if command is a server-specific command
      var json = util.json.JSONFromFile(util.json.getServerJSON(message.guild.id));
      if (json.commands[cmdName] != undefined) {
        message.channel.send(json.commands[cmdName]);
      }
    }
  });

  client.login(config.token);
}
exports.execute = execute;
