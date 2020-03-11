const md5        = require('md5'),
      fs         = require('fs'),
      modules    = require('./modules.js'),
      json       = require('./json.js'),
      xp         = require('./xp.js'),
      counting   = require('./counting.js'),
      pages      = require('./pages.js'),
      currency   = require('./currency.js'),
      marriage   = require('./marriage.js'),
      todo       = require('./todo.js'),
      timers     = require('./timers.js'),
      moderation = require('./moderation.js'),
      joinleave  = require('./joinleave.js'),
      questions  = require('./questions.js'),
      readline   = require('readline');
/*
** seededRand()
** Description: Turns a string into a number (same output for same string)
** Comment: rewritten, brand new
*/

const seededRand = (seed, serverID, localseed) => {
  var random = 0;
  var localseed = getSeed(serverID) || 78125.905218;

  var randomize = function(value) {
    var newvalue = 0;
    value = md5(value);
    for (var i = 0; i < value.length; i++) {
      newvalue += Math.abs((value.charCodeAt(i)-value.charCodeAt(value.length-1-i))*localseed);
    }
    return Math.round(newvalue);
  }

  random = randomize(md5(seed));

  return random;
}

/*
** setSeed()
** Description: Sets seed for server
*/
function setSeed(serverID, seed) {
  if (isNaN(seed) || !isFinite(parseInt(seed))) return;
  var path = json.getServerJSON(serverID);
  var data = json.JSONFromFile(path);
  data.seed = parseInt(seed);
  json.writeJSONToFile(data, path);
}
/*
** getSeed()
** Description: Sets seed for server
*/
function getSeed(serverID) {
  var path = json.getServerJSON(serverID);
  var data = json.JSONFromFile(path);
  return data.seed;
}
/*
** timestamp()
** Description: Returns a timestamp
** Comment: when i was transferring this i saw that it looked like cooked balls (very big and inflated) so i made it better
*/
function timestamp() {
  var format = function(num) {
    if (num < 10) {
       num = "0" + num;
    }
    return num;
  }
  var today = new Date();

  return `[${today.getFullYear()}-${format(today.getMonth()+1)}-${format(today.getDate())} ${format(today.getHours())}:${format(today.getMinutes())}:${format(today.getSeconds())}]`;
}

/*
** cmdCount()
** Description: Gets the amount of commands currently registered
** Comment: needed for bot startup
*/
function cmdCount() {
  var count = 0;
  for (var command in commands) {
    count++;
  }
  for (var command in modulecmds) {
    count++;
  }
  return count;
}

/*
** getServerPrefix()
** Description: Get a server's prefix
*/
function getServerPrefix(id) {
  var data = json.JSONFromFile(json.getServerJSON(id));
  if (data.prefix == undefined) return config.prefix;
  return data.prefix;
}

/*
** setServerPrefix()
** Description: Set a server's prefix
*/
function setServerPrefix(id, prefix) {
  var path = json.getServerJSON(id);
  var data = json.JSONFromFile(path);
  data.prefix = prefix;
  json.writeJSONToFile(data, path);
}

/*
** addCommand()
** Description: Add custom command to server
*/
function addCommand(id, name, text) {
  var path = json.getServerJSON(id);
  var data = json.JSONFromFile(path);
  data.commands[`${name}`] = text;
  json.writeJSONToFile(data, path);
}

/*
** deleteCommand()
** Description: Delete custom command from servers
*/
function deleteCommand(id, name) {
  var path = json.getServerJSON(id);
  var data = json.JSONFromFile(path);
  delete data.commands[name];
  json.writeJSONToFile(data, path);
}
/*
** setCommandDescription()
** Description: Set a custom command's description
*/
function setCommandDescription(id, name, description) {
  var path = json.getServerJSON(id);
  var data = json.JSONFromFile(path);
  data.commands.descriptions[`${name}`] = description;
  json.writeJSONToFile(data, path);
}
/*
** askQuestion()
** Description: query console and retur nit
*/
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}
/*
** generateRandomNumber(min, max)
** Description: guess. guess what this function does.
*/
function generateRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
** getHelpMenu(guildID, page, helpType)
** Description: return the help menu for a user
*/
function getHelpMenu(guildID, userID, page, helpType, mod) {
  var server     = helpType == "server" || helpType == "all" || helpType == undefined, // whether we want server commands or not
      bot        = helpType == "bot" || helpType == "all" || helpType == undefined,    // whether we want bot commands or not
      servercmds = util.json.JSONFromFile(util.json.getServerJSON(guildID)).commands,  // list of server commands
      prefix     = util.getServerPrefix(guildID),                                      // server prefix
      cmdlist    = { servercmds: {} },                                                 // list of commands and their descriptions
      length     = 0,                                                                  // length of cmdlist
      pageSize   = 10,                                                                 // size of each page
      embed      = new Discord.MessageEmbed();                                         // embed to return
  var genCmdObj = function(desc, category) {
    var obj = {
      description: desc,
      category: category
    }
    return obj;
  }
  console.log(`${mod}`);
  if (bot) {
    // Construct a list of all of the commands with their descriptions
    for (var cmd in commands) {
      var category = commands[cmd].path.split(`${__basedir}/commands/`)[1];
      if (category.includes("/")) {
        category = category.substring(0, category.lastIndexOf("/"));
      } else {
        category = '';
      }
      cmdlist[cmd] = genCmdObj(commands[cmd].desc, category);
      if (mod == "") length++;
    }
    // Do the same for module commands.
    for (var cmd in modulecmds) {
      var category = modulecmds[cmd].path.split(`${__basedir}/commands/`)[1];
      if (category.includes("/")) {
        category = category.substring(0, category.lastIndexOf("/"));
      } else {
        category = '';
      }
      if (util.modules.isEnabled(modulecmds[cmd].module, guildID) || util.modules.isEnabledUser(modulecmds[cmd].module, userID)) {
        cmdlist[cmd] = genCmdObj(modulecmds[cmd].desc, category);
        if (mod == "" || mod == modulecmds[cmd].module) length++;
      }
    }
  }
  if (server) {
    // Do the same for server-specific commands
    for (var command in servercmds) {
      cmdlist.servercmds[command] = servercmds.descriptions[command];
      if (cmdlist.servercmds[command] == undefined) cmdlist.servercmds[command] = "No description provided";
      if (mod == "") length++;
    }
  }

  embed.setTitle(`Help Menu${helpType ? ` (${helpType})` : ""} - Page ${page}/${Math.floor(length/pageSize)+1}`);

  var categories = {};
  var nonCategoryCmds = {};
  for (var command in cmdlist) {
    if (command == "servercmds") continue;  // skip over servercmds object as this contains the servercmds and isn't a command per se
    if (cmdlist[command].category !== "") {
      if (categories[`${cmdlist[command].category}`] == undefined) categories[`${cmdlist[command].category}`] = {}; // if it doesnt exist create it cus nested objects are cancer
      categories[`${cmdlist[command].category}`][command] = cmdlist[command];
    } else {
      nonCategoryCmds[command] = cmdlist[command];
    }
  }
  // loop through all commands with category and construct the string to be prefixed
  var iteration = 0;
  for (var category in categories) {
    var categoryBody = "";
    for (var command in categories[category]) {
      if (mod !== "" && mod !== category) continue;
      if (iteration > page*pageSize-1) break; // no need to continue the loop after we've printed all we need to.
      iteration++;
      if (iteration < (page-1)*pageSize+1) continue; // skip over if the beginning of the selected page has not been reached
      var cmd = commands[command] || modulecmds[command];
      var aliases = [];
      for (var alias in cmd.aliases) {
        if (cmd.aliases[alias] !== command) {
          aliases.push(cmd.aliases[alias])
        }
      }
      if (embed.fields.length == 0) embed.addField("**Bot Commands**", "**All commands enabled by default, or from any modules you have enabled**");
      categoryBody += `${prefix}${command} ${cmd.args} - ${cmd.desc}\
${cmd.ex !== "" ? `\nExample: *${prefix}${cmd.ex}*` : ""}\
${aliases.length > 0 ? `\n*Aliases: ${aliases}*` : ""}\n`;
    }
    if (categoryBody !== "") embed.addField(`**${category} commands**`, `${categoryBody}`);
  }
  if (mod !== "") return embed; // if module is specified, return because we dont need to get anything else
  for (var command in nonCategoryCmds) {
    if (iteration > page*pageSize-1) break; // no need to continue the loop after we've printed all we need to.
    iteration++;
    if (iteration < (page-1)*pageSize+1) continue; // skip over if the beginning of the selected page has not been reached
    var aliases = [];
    var cmdaliases = commands[command].aliases;
    for (var alias in cmdaliases) {
      if (cmdaliases[alias] !== command) {
        aliases.push(cmdaliases[alias]);
      }
    }
    if (embed.fields.length == 0) embed.addField("**Bot Commands**", "**All commands enabled by default, or from any modules you have enabled**");
    embed.addField(`${prefix}${command} ${commands[command].args}`, `${commands[command].desc}\
${commands[command].ex !== "" ? `\nExample: *${prefix}${commands[command].ex}*` : ""}\
${aliases.length > 0 ? `\n*Aliases: ${aliases}*` : ""}`);
  }
  if (iteration <= page*pageSize-1) embed.addField("**Server Commands**", "**Commands specific to this server**");
  for (var command in cmdlist.servercmds) {
    if (iteration > page*pageSize-1) break;
    iteration++;
    if (iteration < (page-1)*pageSize+1) continue; // a few of the same checks as above
    embed.addField(`${prefix}${command}`, `${cmdlist.servercmds[command]}`);
  }

  return embed;
}
/*
** getDevlog(day, pagee)
** Description: get the devlog (for page system)
*/
function getDevlog(page, day) {
  var devlogPath = `${__basedir}/data/bot/starts.json`,
      devlog     = util.json.JSONFromFile(devlogPath),
      output     = "",
      days       = {},
      pageSize   = 10,
      embed = new Discord.MessageEmbed();
  for (var time in devlog) {
    var date = new Date(parseInt(time));
    var today = Math.floor((date.getTime()-date.getTimezoneOffset()*60000)/86400000); // Get number of days since epoch (timezone stuff cus it was off by that many hours)
    if (days[today] == undefined) {
      days[today] = {};
    }
    days[today][time] = devlog[time];
  }
  if (day) {
    embed.setTitle(`Devlog for *${new Date(day*86400000+86400000).toLocaleDateString("en-US")}*:`);
    var i = 0;
    for (var time in days[day]) {
      i++;
      if (i < (page-1)*pageSize) continue;
      if (i > page*pageSize) break;
      output += `**${new Date(parseInt(time)).toLocaleString("en-US", { hour12: false } ).split(",")[1]}**: ${days[day][time]}\n`;
    }
    var count = 0;
    for (var time in days[day]) {
      count++;
    }
    embed.setFooter(`Page ${page}/${Math.ceil(count/pageSize)}`);
  } else { // if no day specified
    var i = 0;
    embed.setTitle(`List of Available Devlogs`);
    for (var day in days) {
      i++;
      if (i < (page-1)*pageSize) continue;
      if (i > page*pageSize) break;
      var count = 0;
      for (var time in days[day]) {
        count++;
      }
      output += `**${new Date(day*86400000+86400000).toLocaleDateString("en-US")}** (${day}): ${count}\n`;
    }
    var count = 0;
    for (var time in days) {
      count++;
    }
    embed.setFooter(`Page ${page}/${Math.ceil(count/pageSize)}`);
  }
  embed.setDescription(output);
  return embed;
}
/*
** removeAllBut(string, character, number)
** Description: remove all "${character}"s except for the last ${number} in ${string}
*/
function removeAllBut(string, character, number) {
  var arr = string.split(character);
  if (arr.length-1 <= number) return string; // Return if there are not enough occurences
  var occurences = 0;
  var outputString = ""
  for (var i=arr.length-1; i >= 0; i--) {
    if (occurences < number) {
      outputString = character+arr[i]+outputString;
      occurences++;
    } else {
      outputString = arr[i]+outputString;
    }
  }
  return outputString;
}
/*
** countOccurences(string, character)
** Description: return number of ${character}s in ${string}
*/
function countOccurences(string, character) {
  return string.split(character).length-1;
}
/*
** numberWithCommas(x)
** Description: return number with commas
*/
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
/*
** countKeys(obj)
** Description: counts the number of keys in an object recursively
*/
function countKeys(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return 0;
  }
  const keys = Object.keys(obj);
  let sum = keys.length;
  keys.forEach(key => sum += countKeys(obj[key]));
  return sum;
}
/*
** incrementVersion()
** Description: increments the version number
*/
function incrementVersion() {
  var path = `${__basedir}/data/bot/bot.json`;
  var data = json.JSONFromFile(path);
  if (data.version == undefined) data.version = 0;
  data.version += 1;
  data.date = new Date(Date.now());
  json.writeJSONToFile(data, path);
}
/*
** getDateFormatted(debug)
** Description: formats the given date
*/
function getDateFormatted(d) {
  return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + (d.getHours()+d.getTimezoneOffset()/60)).slice(-2) + ":" +
    ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
}
/*
** progressBar(percentage, size)
** Description: get progress bar  thing
*/
function progressBar(percentage, size) {
  var output = "";
  var filled = Math.round((percentage/100)*size);
  var unfilled = size-filled;
  for (var i = 0; i < filled; i++) {
    output += "█";
  }
  for (var i = 0; i < unfilled; i++) {
    output += "░";
  }
  return output;
}
function getCommandFromAlias(alias) {
  for (var command in commands) {
    if (commands[command].aliases.includes(alias)) return commands[command];
  }
  for (var command in modulecmds) {
    if (modulecmds[command].aliases.includes(alias)) return modulecmds[command];
  }
}

exports.questions = questions;
exports.getCommandFromAlias = getCommandFromAlias;
exports.joinleave = joinleave;
exports.moderation = moderation;
exports.progressBar = progressBar;
exports.timers = timers;
exports.getDateFormatted = getDateFormatted;
exports.countKeys = countKeys;
exports.incrementVersion = incrementVersion;
exports.numberWithCommas = numberWithCommas;
exports.setSeed = setSeed;
exports.getSeed = getSeed;
exports.countOccurences = countOccurences;
exports.removeAllBut = removeAllBut;
exports.todo = todo;
exports.marriage = marriage;
exports.currency = currency;
exports.getDevlog = getDevlog;
exports.getHelpMenu = getHelpMenu;
exports.pages = pages;
exports.generateRandomNumber = generateRandomNumber;
exports.askQuestion = askQuestion;
exports.xp = xp;
exports.counting = counting;
exports.json = json;
exports.modules = modules;
exports.setCommandDescription = setCommandDescription;
exports.addCommand = addCommand;
exports.deleteCommand = deleteCommand;
exports.getServerPrefix = getServerPrefix;
exports.setServerPrefix = setServerPrefix;
exports.cmdCount = cmdCount;
exports.timestamp = timestamp;
exports.seededRand = seededRand;
