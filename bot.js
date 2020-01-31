global.__basedir = __dirname; // global variable that stores base directory
global.datapath = `${__basedir}/data`;
global.commands = {};
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
  commands[file.split("/")[file.split("/").length-1].split(".")[0]] = require(file); // Remove directory to get just the command name
});

console.log(commands); // View registered commands and their function(s) in console

client.on('ready', () => {
  var startMessage = `${util.timestamp()} Logged in as ${client.user.tag}!\nI'm in ${client.guilds.size} servers with ${client.users.size} users in ${client.channels.size} channels serving ${util.cmdCount()} commands!`;
  console.log(startMessage);
  client.guilds.get("587038554539032577").channels.get("612021603261480969").send(startMessage); // send message to bot-brain channel
  // Check all servers and see if they have a designated file.
  client.guilds.array().forEach((item, i) => {
    var file = `${datapath}/server/${item.id}.json`;
    if (!fs.existsSync(file)) {
      var defaultJson = {
        prefix: config.prefix
      }
      util.writeJSONToFile(defaultJson, file);
    }
  });

});

client.on('message', message => {
  var prefix = util.getServerPrefix(message.guild.id);
  console.log(message.content);
  // Check if message contains prefix
  if (message.content.startsWith(prefix)) {
    var cmdName = message.content.split(prefix)[1].split(" ")[0];
    // Check if command name is a valid command
    if (commands[cmdName] != undefined) {
      // Pass to command.js for easier interpreting later
      command.set(message);
      // Run commandye
      commands[cmdName].execute(message, command);
    }
  }
});

client.login(config.token);
