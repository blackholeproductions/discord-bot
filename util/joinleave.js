module.exports = {
  setJoinMessage(guildID, joinMessage) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    data.joinMessage = joinMessage;
    util.json.writeJSONToFile(data, path);
  },
  getJoinMessage(guildID) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    return data.joinMessage || "<user> joined <server>! Welcome!";
  },
  setLeaveMessage(guildID, leaveMessage) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    data.leaveMessage = leaveMessage;
    util.json.writeJSONToFile(data, path);
  },
  getLeaveMessage(guildID) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    return data.leaveMessage || "<user> left <server>. :(";
  },
  setJoinLeaveChannel(guildID, channelID) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    data.joinLeaveChannel = channelID;
    util.json.writeJSONToFile(data, path);
  },
  getJoinLeaveChannel(guildID) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    if (client.guilds.cache.get(guildID)) {
      var defaultChannel = client.guilds.cache.get(guildID).systemChannel
      return client.guilds.cache.get(guildID).channels.cache.get(data.joinLeaveChannel) || defaultChannel;
    }
  }
}
