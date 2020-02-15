const util = require(`${__basedir}/util/util.js`);

/*
** isChannel(guildID, channelID)
** Description: checks if a given channel is a counting channel
*/
function isChannel(guildID, channelID) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  if (data.counting == undefined) data.counting = {}; // if the counting module hasn't been used, create the object so js doesn't scream undefined
  if (data.counting.channel !== channelID) return false;
  return true;
}
/*
** setChannel(guildID, channelID)
** Description: sets counting channel in guild
*/
function setChannel(guildID, channelID) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  if (data.counting == undefined) data.counting = {};
  data.counting.channel = channelID;
  util.json.writeJSONToFile(data, path);
}
/*
** isValidCount(guildID, count)
** Description: checks if the given count is a valid one
*/
function isValidCount(guildID, count, userID) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  if (data.counting == undefined) data.counting = {};
  if (data.counting.count == undefined) data.counting.count = 0;
  if (count == data.counting.count+1 && userID !== data.counting.user) return true;
  return false;
}
/*
** count(guildID, userID)
** Description: counts in the given guild
*/
function count(guildID, userID) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  if (data.counting == undefined) data.counting = {};
  if (data.counting.count == undefined || isNaN(data.counting.count)) data.counting.count = 0;
  if (data.counting.users == undefined) data.counting.users = {}; // add users object so js doesnt scream blah blah
  if (data.counting.users[userID] == undefined) data.counting.users[userID] = 0;
  data.counting.count += 1;
  data.counting.user = userID;
  data.counting.users[userID] += 1;
  util.json.writeJSONToFile(data, path);
}
/*
** setCount(guildID, count)
** Description: sets the count to the given value
*/
function setCount(guildID, count) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  if (data.counting == undefined) data.counting = {};
  data.counting.count = count;
  util.json.writeJSONToFile(data, path);
}
/*
** getCounts(guildID, userID)
** Description: sets the count to the given value
*/
function getCounts(guildID, userID) {
  var path = util.json.getServerJSON(guildID);
  var data = util.json.JSONFromFile(path);
  if (data.counting == undefined) data.counting = {};
  if (data.counting.users == undefined) data.counting.users = {};
  if (data.counting.users[userID] == undefined) data.counting.users[userID] = 0;
  return data.counting.users[userID];
}

exports.getCounts = getCounts;
exports.setCount = setCount;
exports.count = count;
exports.isValidCount = isValidCount;
exports.setChannel = setChannel;
exports.isChannel = isChannel;
