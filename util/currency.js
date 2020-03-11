const util = require(`${__basedir}/util/util.js`);
var activeCooldowns = {};
var globalCooldowns = {};
module.exports = {
  get(guild, user) {
    var path = util.json.getServerJSON(guild);
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};
    if (data.currency.users == undefined) data.currency.users = {};
    if (data.currency.users[user] == undefined) data.currency.users[user] = 0;

    return data.currency.users[user];

  },
  set(guild, user, amount) {
    var path = util.json.getServerJSON(guild);
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};
    if (data.currency.users == undefined) data.currency.users = {};
    if (data.currency.users[user] == undefined) data.currency.users[user] = 0;

    data.currency.users[user] = amount;

    util.json.writeJSONToFile(data, path);
  },
  add(guild, user, amount, skipCooldown) {
    if (this.hasCooldown(user) && !skipCooldown) return; // stop user from gaining currency if a cooldown is active unless it has been specified that the cooldown should be skipped
    this.addCooldown(user);
    this.set(guild, user, this.get(guild, user)+amount);
  },
  getCurrencyName(guild) {
    var path = util.json.getServerJSON(guild);
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};

    return data.currency.name;
  },
  setCurrencyName(guild, name) {
    var path = util.json.getServerJSON(guild);
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};
    data.currency.name = name;
    util.json.writeJSONToFile(data, path);
  },
  getCurrencySymbol(guild) {
    var path = util.json.getServerJSON(guild);
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};

    return data.currency.symbol;
  },
  setCurrencySymbol(guild, symbol) {
    var path = util.json.getServerJSON(guild);
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};
    data.currency.symbol = symbol;
    util.json.writeJSONToFile(data, path);
  },
  topBalances(guild, page) {
    var path = util.json.getServerJSON(guild),
        data = util.json.JSONFromFile(path),
        embed = new Discord.MessageEmbed(),
        pageSize = 10,
        output = "";
    // Sort by putting in array and using the sort() function
    var array = [];
    for (var user in data.currency.users) {
      array.push({ id: user, balance: data.currency.users[user] });
    }
    array.sort(function(a, b) { // sort
      return b.balance - a.balance;
    });
    embed.setColor("#ff8080");
    embed.setAuthor(`${client.guilds.cache.get(guild).name}`, `${client.guilds.cache.get(guild).iconURL()}`);
    embed.setTitle("Top Balances");
    var i = 0;
    for (var object in array) {
      if (array[object].id == "672280373065154569") continue; // Skip bot user from leaderboard
      if (client.guilds.cache.get(guild).members.cache.get(array[object].id) !== undefined && client.guilds.cache.get(guild).members.cache.get(array[object].id).user.bot) continue; // Skip user if they are a bot
      i++;
      if (i < (page-1)*pageSize+(page-1)) continue; // Page system
      if (i > page*pageSize) break;
      var member = client.guilds.cache.get(guild).members.cache.get(array[object].id);
      if (member == undefined) member = { user: { username: "Unknown", id: array[object].id} }; // Replace username with "Unknown" since we don't know what their real username is
      var string = `${i}. <@${member.user.id}> - ${this.get(guild, member.user.id)} ${this.getCurrencyName(guild)}${this.get(guild, member.user.id) !== 1 ? "s" : ""}\n`;
      if (i == 1) {
        output += `**${string}**`;
        embed.setThumbnail(`${member.user.displayAvatarURL() ? member.user.displayAvatarURL() : ""}`);
      } else output += string;
    }
    embed.setDescription(output);
    embed.setFooter(`Page ${page}`);
    embed.setTimestamp();
    return embed;
    util.json.writeJSONToFile(data, path);
  },
  addCooldown(user) {
    activeCooldowns[user] = 20;
  },
  hasCooldown(user) {
    if (activeCooldowns[user] == undefined) return false; else return true;
  },
  startCooldowns() {
    setInterval(function() {
      for (var user in activeCooldowns) {
        activeCooldowns[user] = activeCooldowns[user] - 1;
        if (activeCooldowns[user] == 0) {
          delete activeCooldowns[user];
        }
      }
      for (var user in globalCooldowns) {
        globalCooldowns[user] = globalCooldowns[user] - 1;
        if (globalCooldowns[user] == 0) {
          delete globalCooldowns[user];
        }
      }
    }, 1000);
  },
  addGlobalCooldown(user) {
    globalCooldowns[user] = 20;
  },
  hasGlobalCooldown(user) {
    if (globalCooldowns[user] == undefined) return false; else return true;
  },
  getGlobal(user) {
    var path = `${__basedir}/data/bot/globalcurrency.json`;
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};
    if (data.currency[user] == undefined) data.currency[user] = 0;

    return data.currency[user];

  },
  setGlobal(user, amount) {
    var path = `${__basedir}/data/bot/globalcurrency.json`;
    var data = util.json.JSONFromFile(path);
    if (data.currency == undefined) data.currency = {};
    if (data.currency[user] == undefined) data.currency[user] = 0;
    data.currency[user] = amount;

    util.json.writeJSONToFile(data, path);
  },
  addGlobal(guild, user, amount, skipCooldown) {
    if (this.hasGlobalCooldown(user) && !skipCooldown) return; // stop user from gaining currency if a cooldown is active unless it has been specified that the cooldown should be skipped
    if (!util.xp.isTrusted(guild)) return;
    console.log(`add ${amount} to ${user}`)
    this.addGlobalCooldown(user);
    this.setGlobal(user, this.getGlobal(user)+amount);
  },
  topGlobalBalances(page) {
    var path = `${__basedir}/data/bot/globalcurrency.json`,
        data = util.json.JSONFromFile(path),
        embed = new Discord.MessageEmbed(),
        pageSize = 10,
        output = "";
    // Sort by putting in array and using the sort() function
    var array = [];
    for (var user in data.currency) {
      array.push({ id: user, balance: data.currency[user] });
    }
    array.sort(function(a, b) { // sort
      return b.balance - a.balance;
    });
    embed.setColor("#ff8080");
    embed.setTitle("Global Top Balances");
    var i = 0;
    for (var object in array) {
      if (array[object].id == "672280373065154569") continue; // Skip bot user from leaderboard
      if (client.users.cache.get(array[object].id).bot) continue; // Skip user if they are a bot
      i++;
      if (i < (page-1)*pageSize+(page-1)) continue; // Page system
      if (i > page*pageSize) break;
      var member = client.users.cache.get(array[object].id);
      if (member == undefined) member = { user: { username: "Unknown", id: array[object].id} }; // Replace username with "Unknown" since we don't know what their real username is
      var string = `${i}. <@${member.id}> - ${this.getGlobal(member.id)} atom${this.getGlobal(member.id) !== 1 ? "s" : ""}\n`;
      if (i == 1) {
        output += `**${string}**`;
        embed.setThumbnail(`${member.displayAvatarURL() ? member.displayAvatarURL() : ""}`);
      } else output += string;
    }
    embed.setDescription(output);
    embed.setFooter(`Page ${page}`);
    embed.setTimestamp();
    return embed;
    util.json.writeJSONToFile(data, path);
  }
}
