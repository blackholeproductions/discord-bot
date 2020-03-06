const util = require(`${__basedir}/util/util.js`);

function setJoinMessage(guildID, joinMessage) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  data.joinMessage = joinMessage;
  util.json.writeJSONToFile(data, path);
}

function getJoinMessage(guildID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  return data.joinMessage || "<user> joined <server>! Welcome!";
}
function setLeaveMessage(guildID, leaveMessage) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  data.leaveMessage = leaveMessage;
  util.json.writeJSONToFile(data, path);
}
function getLeaveMessage(guildID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  return data.leaveMessage || "<user> left <server>. :(";
}
function setJoinLeaveChannel(guildID, channelID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  data.joinLeaveChannel = channelID;
  util.json.writeJSONToFile(data, path);
}
function getJoinLeaveChannel(guildID) {
  var path = util.json.getServerJSON(guildID),
      data = util.json.JSONFromFile(path);
  if (client.guilds.get(guildID)) {
    var defaultChannel = client.guilds.get(guildID).systemChannel
    return client.guilds.get(guildID).channels.get(data.joinLeaveChannel) || defaultChannel;
  }
}

exports.setJoinLeaveChannel = setJoinLeaveChannel;
exports.getJoinLeaveChannel = getJoinLeaveChannel;
exports.setLeaveMessage = setLeaveMessage;
exports.getLeaveMessage = getLeaveMessage;
exports.getJoinMessage = getJoinMessage;
exports.setJoinMessage = setJoinMessage;
