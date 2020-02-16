const md5      = require('md5'),
      fs       = require('fs'),
      modules  = require('./modules.js'),
      json     = require('./json.js'),
      xp       = require('./xp.js'),
      counting = require('./counting.js'),
      pages    = require('./pages.js'),
      readline = require('readline');
/*
** seededRand()
** Description: Turns a string into a number (same output for same string)
** Comment: rewritten, brand new
*/

const seededRand = (seed, localseed) => {
  var random = 0;
  if (localseed == 0 || isNaN(localseed)) localseed = 78125.905218;

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
** Description: return the help menu for a server
*/
function getHelpMenu(guildID, page, helpType) {
  var server     = helpType == "server" || helpType == "all" || helpType == undefined,         // whether we want server commands or not
      bot        = helpType == "bot" || helpType == "all" || helpType == undefined,            // whether we want bot commands or not
      servercmds = util.json.JSONFromFile(util.json.getServerJSON(guildID)).commands,          // list of server commands
      prefix     = util.getServerPrefix(guildID),                                              // server prefix
      cmdlist    = { servercmds: {} },                                                         // list of commands and their descriptions
      length     = 0,                                                                          // length of cmdlist
      pageSize   = 10,                                                                         // size of each page
      draft      = "",
      embed      = new Discord.RichEmbed();                                                    // embed to return
  var genCmdObj = function(desc, category) {
    var obj = {
      description: desc,
      category: category
    }
    return obj;
  }
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
      length++;
    }
    // Do the same for module commands.
    for (var cmd in modulecmds) {
      var category = modulecmds[cmd].path.split(`${__basedir}/commands/`)[1];
      if (category.includes("/")) {
        category = category.substring(0, category.lastIndexOf("/"));
      } else {
        category = '';
      }
      if (util.modules.isEnabled(modulecmds[cmd].module, guildID)) {
        cmdlist[cmd] = genCmdObj(modulecmds[cmd].desc, category);
        length++;
      }
    }
  }
  if (server) {
    // Do the same for server-specific commands
    for (var command in servercmds) {
      cmdlist.servercmds[command] = servercmds.descriptions[command];
      if (cmdlist.servercmds[command] == undefined) cmdlist.servercmds[command] = "No description provided";
      length++;
    }
  }

  embed.setTitle(`Help Menu${helpType ? ` (${helpType})` : ""} - Page ${page}/${Math.floor(length/pageSize)+1}`);

  var iteration = 0;
  var categories = {};
  var nonCategoryCmds = {};
  for (var command in cmdlist) {
    if (iteration > page*pageSize-1) break; // no need to continue the loop after we've printed all we need to.
    if (command == "servercmds") continue;  // skip over servercmds object as this contains the servercmds and isn't a command per se
    iteration++;
    if (iteration < (page-1)*pageSize+1) continue; // skip over if the beginning of the selected page has not been reached
    if (cmdlist[command].category !== "") {
      if (categories[`${cmdlist[command].category}`] == undefined) categories[`${cmdlist[command].category}`] = {}; // if it doesnt exist create it cus nested objects are cancer
      categories[`${cmdlist[command].category}`][command] = cmdlist[command];
    } else {
      nonCategoryCmds[command] = cmdlist[command];
    }
  }
  if (Object.keys(categories).length != 0 || Object.keys(nonCategoryCmds).length != 0) embed.addField("**Bot Commands**", "**All commands enabled by default, or from any modules you have enabled**");
  // loop through all commands with category and construct the string to be prefixed
  for (var category in categories) {
    var categoryBody = "";
    for (var command in categories[category]) {
      var cmd = commands[command] || modulecmds[command];
      categoryBody += `  *${prefix}${command}${cmd.args ? ` ${cmd.args}` : ""}* - ${categories[category][command].description}\n`;
    }
    embed.addField(`**${category} commands**`, `${categoryBody}`);
  }

  for (var command in nonCategoryCmds) {
    embed.addField(`${prefix}${command} ${commands[command].args}`, `${nonCategoryCmds[command].description}`);
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

function getDevlog(day, page) {
  var devlogPath = `${__basedir}/data/bot/starts.json`,
      devlog     = util.json.JSONFromFile(devlogPath),
      output     = "",
      days       = {},
      pageSize   = 10;
  for (var time in devlog) {
    var date = new Date(parseInt(time));
    var today = Math.floor((date.getTime()-date.getTimezoneOffset()*60000)/86400000); // Get number of days since epoch (timezone stuff cus it was off by that many hours)
    if (days[today] == undefined) {
      days[today] = {};
    }
    days[today][time] = devlog[time];
  }
  if (day) {
    output += `*${new Date(day*86400000+86400000).toLocaleDateString("en-US")}*:\n`;
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
    output += `Page ${page}/${Math.ceil(count/pageSize)}`;
  } else { // if no day specified
    for (var day in days) {
      var count = 0;
      for (var time in days[day]) {
        count++;
      }
      output += `**${new Date(day*86400000+86400000).toLocaleDateString("en-US")}** (${day}): ${count}\n`;
    }
  }
  return output;
}
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
