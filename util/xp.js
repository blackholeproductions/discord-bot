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
  if (hasXPCooldown(user) && !amount) return; // check if amount is specified, and if so, skip xp cooldown
  if (!amount && !(amount < 0)) amount = getExpGained(getLevel(user, guild));
  if (data.xp == undefined) data.xp = {}; // if the server hasn't used xp before, add the object so js doesn't scream undefined
  if (data.xp[user] == undefined) data.xp[user] = 0; //set xp to 0 if it doesn't exist
  data.xp[user] += amount; // add xp
  var date = new Date(Date.now());
  var day = Math.floor((date.getTime()-date.getTimezoneOffset()*60000)/86400000); // Get number of days since epoch (timezone stuff cus it was off by that many hours)
  if (data.xp.history == undefined) data.xp.history = {};
  if (data.xp.history[day] == undefined) data.xp.history[day] = {}; // same as above except with individual days
  if (data.xp.history[day][user] == undefined) data.xp.history[day][user] = 0;
  data.xp.history[day][user] += amount; // add xp to current day (for activity command)
  util.json.writeJSONToFile(data, path);

  addXPCooldown(user); // Add XP cooldown so that the user can't spam and earn XP
  if (util.modules.isEnabled("xpleaderboard", guild)) updateLeaderboard(guild); // Update the leaderboard if the module is enabled
  if (util.modules.isEnabled("xp-roles", guild)) updateRoles(user, guild); // Update the user's roles if the module is enabled
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
  activeCooldowns[user] = 20;
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
/*
** getLeaderboard(id, page)
** Description: start the xp timers
** Comment: get a leaderboard string
*/
function getLeaderboard(id, page) {
  page = page || 1;
  var pageSize = 10,
      output   = "",
      path     = util.json.getServerJSON(id),
      data     = util.json.JSONFromFile(path),
      output   = "";
  if (data.xp == undefined) return "There is no xp data for this server.";
  // Sort by putting in array and using the sort() function
  var array = [];
  for (var xp in data.xp) {
    array.push({ id: xp, xp: data.xp[xp] });
  }
  array.sort(function(a, b) {
    return b.xp - a.xp;
  });
  // get day for showing today's xp gained in leaderboardChannelID
  var date = new Date(Date.now());
  var day = Math.floor((date.getTime()-date.getTimezoneOffset()*60000)/86400000); // Get number of days since epoch (timezone stuff cus it was off by that many hours)
  if (data.xp.history == undefined) data.xp.history = {};
  if (data.xp.history[day] == undefined) data.xp.history[day] = {};

  var i = 0;
  for (var object in array) {
    if (isNaN(parseInt(array[object].id))) continue; // Handle non-users in xp object
    if (array[object].id == "672280373065154569") continue; // Skip bot user from leaderboard
    i++;
    if (i < (page-1)*pageSize+(page-1)) continue; // Page system
    if (i > page*pageSize) break;
    var member = client.guilds.get(id).members.get(array[object].id);
    var xptoday = data.xp.history[day][member.user.id];
    if (member == undefined) member = { user: { username: "Unknown", id: "Unknown"} }; // Replace username with "Unknown" since we don't know what their real username is
    output += `${i}. **<@${member.user.id}>** - ${getXP(array[object].id, id)} xp${xptoday !== undefined ? " (" : ""}${xptoday >= 0 ? "+" : ""}${xptoday < 0 ? "-" : ""}${xptoday !== undefined ? `${xptoday} gained today` : ""}${xptoday !== undefined ? ")" : ""}, Level ${getLevel(array[object].id, id)}${util.modules.isEnabled("xp-roles", id) ? ` <@&${getHighestRole(id, getLevel(array[object].id, id))}>` : ""}\n`;
  }
  output += `Page ${Math.ceil((i-1)/pageSize)}`;
  return output;
}
/*
** setLeaderboardMessage(guildID, channelid, messageid)
** Description: set the message id to edit the leaderboard into
*/
function setLeaderboardMessage(guildID, channelID, messageID) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  data.xp.leaderboardMessageID = messageID;
  data.xp.leaderboardChannelID = channelID;
  util.json.writeJSONToFile(data, path);
}
/*
** updateLeaderboard(guildID)
** Description: update the leaderboard in the given server
*/
function updateLeaderboard(guildID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path),
      channelID = data.xp.leaderboardChannelID,
      messageID = data.xp.leaderboardMessageID;
  if (channelID == undefined || messageID == undefined) return;
  client.guilds.get(guildID).channels.get(channelID).fetchMessage(messageID)
    .then(msg => msg.edit(getLeaderboard(guildID)))
    .catch(`Error updating leaderboard in ${guildID}`);
}
/*
** setRole(guildID, roleID, levelThreshold)
** Description: set a role to be obtained at a certain level
*/
function setRole(guildID, roleID, levelThreshold) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  if (data.xp.roles == undefined) data.xp.roles = {}; // Add roles object if it doesn't already exist
  data.xp.roles[roleID] = levelThreshold; // set the role id property of roles object to the level so that we know what level to check for in updateRoles
  util.json.writeJSONToFile(data, path);
}
/*
** deleteRole(guildID, roleID)
** Description: remove role from level
*/
function removeRole(guildID, roleID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  if (data.xp.roles == undefined) data.xp.roles = {}; // Add roles object if it doesn't already exist
  delete data.xp.roles[roleID]; // delete role lol
  util.json.writeJSONToFile(data, path);
}

/*
** updateRoles(userID, guildID)
** Description: update roles for a user.
** Comment: Also supports removal of xp and not just gaining
*/
function updateRoles(userID, guildID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  if (data.xp.roles == undefined) data.xp.roles = {}; // Add roles object if it doesn't already exist
  for (var role in data.xp.roles) {
    var member = client.guilds.get(guildID).members.get(userID); // Get the member
    if (getLevel(userID, guildID) >= data.xp.roles[role]) {
      member.addRole(role, "Reached level threshold"); // Add the role to the user
    } else {
      if (member.roles.get(role) !== undefined) { // If the user has the role and they aren't high enough level to have it, remove it
        member.removeRole(role, "Under level threshold");
      }
    }
  }
}
/*
** getHighestRole(level)
** Description: gets highest role for specific level
*/
function getHighestRole(guildID, level) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path),
      output = "`No role`";
  if (data.xp.roles == undefined) data.xp.roles = {}; // Add roles object if it doesn't already exist
  for (var role in data.xp.roles) {
    if (level >= data.xp.roles[role]) {
      output = role;
    }
  }
  return output;
}

exports.getHighestRole = getHighestRole;
exports.removeRole = removeRole;
exports.updateRoles = updateRoles;
exports.setRole = setRole;
exports.setLeaderboardMessage = setLeaderboardMessage;
exports.updateLeaderboard = updateLeaderboard;
exports.getLeaderboard = getLeaderboard;
exports.startXPCooldowns = startXPCooldowns;
exports.hasXPCooldown = hasXPCooldown;
exports.addXPCooldown = addXPCooldown;
exports.getExpGained = getExpGained;
exports.getLevel = getLevel;
exports.addXP = addXP;
exports.getXP = getXP;
exports.isEnabled = isEnabled;
