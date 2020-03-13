const util = require(`${__basedir}/util/util.js`);

module.exports = {
  add(guildID, userID, warning) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    if (data.warnings == undefined) data.warnings = {};
    if (data.warnings[userID] == undefined) data.warnings[userID] = [];
    data.warnings[userID].push(warning);
    util.json.writeJSONToFile(data, path);
  },
  remove(guildID, userID, index) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path);
    if (data.warnings == undefined) data.warnings = {};
    if (data.warnings[userID] == undefined) data.warnings[userID] = [];
    data.warnings[userID].splice(index-1, 1);
    util.json.writeJSONToFile(data, path);
  },
  list(guildID, userID) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path),
        output = "",
        embed = new Discord.MessageEmbed();
    if (data.warnings == undefined) data.warnings = {};
    if (data.warnings[userID] == undefined) data.warnings[userID] = [];
    for (var index in data.warnings[userID]) {
      var warning = data.warnings[userID][index];
      output += `${parseInt(index)+1}. ${warning}`;
    }
    embed.setTitle(`${client.users.cache.get(userID).username}'s warnings`)
         .setDescription(output)
         .setTimestamp();
    return embed;
  }
};
