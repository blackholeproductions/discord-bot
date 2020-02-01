global.__basedir = __dirname; // global variable that stores base directory
global.datapath = `${__basedir}/data`;
global.commands = {};
global.cmdpaths = {};
global.config = require("./config.js");
global.util = require("./util/util.js");
const Discord = require('discord.js'),
      client  = new Discord.Client(),
      path    = require('path'),
      fs      = require('fs'),
      md5     = require('md5');

var command = require('./command.js');
// Get all .js files recursively in the ./commands/ directory and register them as a command
var filePath = path.join(__dirname, "commands");

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

readFiles(filePath).filter(file => file.endsWith('.js')).forEach(function(file) {
  var name = file.split("/")[file.split("/").length-1].split(".")[0]; // Remove directory to get just the command name
  commands[name] = require(file);
  commands[name].path = file; // Save the filepath in the command
  if (commands[name].args == undefined) commands[name].args = ""; // if the command doesn't specify arguments, set it to nothing so js doesn't scream undefined at me
});

console.log(commands); // View registered commands and their function(s) in console

client.on('ready', () => {
  var startMessage = `**${util.timestamp()}** Logged in as *${client.user.tag}*!\nI'm in ${client.guilds.size} servers with ${client.users.size} users in ${client.channels.size} channels serving ${util.cmdCount()} commands!`;
  client.guilds.get("587038554539032577").channels.get("612021603261480969").send(startMessage); // send message to bot-brain channel
  // Check all servers and see if they have a designated file. If they don't, make one.
  client.guilds.array().forEach((item, i) => {
    var file = `${datapath}/server/${item.id}.json`;
    if (!fs.existsSync(file)) {
      var defaultJson = {
        prefix: config.prefix,
        commands: {
          descriptions: {}
        }
      }
      util.writeJSONToFile(defaultJson, file);
    }
  });

});

client.on('message', message => {
  if (message.guild == null) return;

  var prefix = util.getServerPrefix(message.guild.id);
  console.log(`${util.timestamp()} ${message.author.tag} (${message.channel.name}): ${message.content}`);
  // Check if message contains prefix
  if (message.content.startsWith(prefix)) {
    var cmdName = message.content.split(prefix)[1].split(" ")[0];
    // Check if command name is a valid command
    if (commands[cmdName] != undefined) {
      // Pass to command.js for easier interpreting later
      command.set(message);
      // Run command
      commands[cmdName].execute(message, command); // messa
    }
    // Check if command is a server-specific command
    var json = util.JSONFromFile(util.getServerJSON(message.guild.id));
    if (json.commands[cmdName] != undefined) {
      message.channel.send(json.commands[cmdName]);
    }
  }
});

client.login(config.token);
