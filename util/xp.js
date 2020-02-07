const util = require(`${__basedir}/util/util.js`);
var activeCooldowns = {};
/*
** isEnabled()
** Description: see if xp module is enabled in a server
*/
function isEnabled(id) {
  if (util.modules.isEnabled("xp", id)) return true; else return false;
}
/*
** addXP(user, guild, amount) / getXP (user, guild)
** Description: get xp from/add xp to user in server
*/
function addXP(user, guild, amount) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  amount = amount || getExpGained(getLevel(user, guild));
  if (hasXPCooldown(user)) return;
  if (data.xp == undefined) data.xp = {}; // if the server hasn't used xp before, add the object so js doesn't scream undefined
  if (data.xp[user] == undefined) data.xp[user] = 0; //set xp to 0 if it doesn't exist
  data.xp[user] = data.xp[user] + amount; // add xp
  util.json.writeJSONToFile(data, path);
  addXPCooldown(user);
}
function getXP(user, guild) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.xp == undefined) data.xp = {};
  if (data.xp[user] == undefined) data.xp[user] = 0; // same as above function
  return data.xp[user];
}

/*
** getLevel(user, guild)
** Description: get level of user in server
*/
function getLevel(user, guild) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.xp == undefined) data.xp = {};
  if (data.xp[user] == undefined) data.xp[user] = 0; // same as above function
  var level = 1;
  for (var i = 1; i < 60; i++) {
    //13.88888889 x3 + 195.2380952 x2 + 195.6349206 x
    var currentxp = Math.round(13.88888889*Math.pow(i, 3)+195.2380952*Math.pow(i, 2)+195.6349206*i);
    if (data.xp[user] > currentxp) {
      level++;
    }
  }
  return level;
}
/*
** getExpGained(level)
** Description: get xp gained for level
*/
function getExpGained(level) {
  return 45 + (5 * level) + util.generateRandomNumber(0, level);
}
/*
** addXPCooldown(user) / hasXPCoooldown(user)
** Description: add/see if user has an xp cooldown
** Comment: so users dont spam
*/
function addXPCooldown(user) {
  activeCooldowns[user] = 5;
}
function hasXPCooldown(user) {
  if (activeCooldowns[user] == undefined) return false; else return true;
}
/*
** startXPCooldowns()
** Description: start the xp timers
** Comment: called in bot function
*/
function startXPCooldowns() {
  setInterval(function() {
    for (var user in activeCooldowns) {
      activeCooldowns[user] = activeCooldowns[user] - 1;
      if (activeCooldowns[user] == 0) {
        delete activeCooldowns[user];
      }
    }
  }, 1000);
}

exports.startXPCooldowns = startXPCooldowns;
exports.hasXPCooldown = hasXPCooldown;
exports.addXPCooldown = addXPCooldown;
exports.getExpGained = getExpGained;
exports.getLevel = getLevel;
exports.addXP = addXP;
exports.getXP = getXP;
exports.isEnabled = isEnabled;
