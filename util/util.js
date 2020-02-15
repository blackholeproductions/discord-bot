const md5      = require('md5'),
      fs       = require('fs'),
      modules  = require('./modules.js'),
      json     = require('./json.js'),
      xp       = require('./xp.js'),
      counting = require('./counting.js'),
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
    }))
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
