const Discord = require('discord.js'),
      client  = new Discord.Client(),
      config  = require("./config.js"),
      path    = require('path'),
      fs      = require('fs'),
      util    = require("./commands/util/util.js"),
      md5     = require('md5');

var commands = {},
    command  = require('./command.js');
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}
// Get all .js files in the ./commands/ directory and register them as a command
var filePath = path.join(__dirname, "commands");

fs.readdirSync(filePath).filter(file => file.endsWith('.js')).forEach(function(file) {
  commands[file.split(".")[0]] = require('./commands/'+file);
  // get each directory in path and then for each directory get files and add
console.log(getDirectories(filePath));
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
