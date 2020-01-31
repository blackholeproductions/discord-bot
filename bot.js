global.__basedir = __dirname; // global variable that stores base directory
global.commands = {};
global.config = require("./config.js");
const Discord = require('discord.js'),
      client  = new Discord.Client(),
      path    = require('path'),
      fs      = require('fs'),
      util    = require("./util/util.js"),
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
  console.log(
    `Logged in as ${client.user.tag}!
    I'm in ${client.guilds.size} servers with ${client.users.size} users in ${client.channels.size} channels.`
  );
});

client.on('message', message => {
  // Check if message contains prefix
  if (message.content.startsWith(config.prefix)) {
    var cmdName = message.content.split(config.prefix)[1].split(" ")[0];
    // Check if command name is a valid command
    if (commands[cmdName] != undefined) {
      // Pass to command.js for easier interpreting later
      command.set(message);
      // Run command
      commands[cmdName].execute(message, command);
    }
  }
});

client.login(config.token);
