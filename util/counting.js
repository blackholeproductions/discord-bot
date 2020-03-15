module.exports = {
  isChannel(guildID, channelID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.counting == undefined) data.counting = {}; // if the counting module hasn't been used, create the object so js doesn't scream undefined
    if (data.counting.channel !== channelID) return false;
    return true;
  },
  setChannel(guildID, channelID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.counting == undefined) data.counting = {};
    data.counting.channel = channelID;
    util.json.writeJSONToFile(data, path);
  },
  getChannel(guildID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.counting == undefined) data.counting = {};
    return data.counting.channel;
  },
  async isValidCount(guildID, count, userID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    var channel = client.guilds.cache.get(guildID).channels.cache.get(this.getChannel(guildID));
    var array = channel.messages.cache.array();
    return await channel.messages.fetch({ limit: 2 }).then(messages => {
      var message = messages.last();
      if (data.counting == undefined) data.counting = {};
      if (count.includes(" ")) return false;
      if (isNaN(count)) return false;
      if (count.includes('.')) return false;
      if (!channel || !message) return false;
      if (parseInt(count) == parseInt(message.content)+1 && message.author.id !== userID) return true;
      return false;
    });
  },
  count(guildID, userID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.counting == undefined) data.counting = {};
    if (data.counting.users == undefined) data.counting.users = {}; // add users object so js doesnt scream blah blah
    if (data.counting.users[userID] == undefined) data.counting.users[userID] = 0;
    data.counting.users[userID] += 1;
    util.json.writeJSONToFile(data, path);
  },
  getCounts(guildID, userID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.counting == undefined) data.counting = {};
    if (data.counting.users == undefined) data.counting.users = {};
    if (data.counting.users[userID] == undefined) data.counting.users[userID] = 0;
    return data.counting.users[userID];
  }
}
