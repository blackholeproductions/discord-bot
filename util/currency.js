const util = require(`${__basedir}/util/util.js`);
var activeCooldowns = {};
/*
** get(guild, user)
** Description: get balance of user
*/
function get(guild, user) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.currency == undefined) data.currency = {};
  if (data.currency.users == undefined) data.currency.users = {};
  if (data.currency.users[user] == undefined) data.currency.users[user] = 0;

  return data.currency.users[user];

}

/*
** set(guild, user, amount)
** Description: set balance of user
*/
function set(guild, user, amount) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.currency == undefined) data.currency = {};
  if (data.currency.users == undefined) data.currency.users = {};
  if (data.currency.users[user] == undefined) data.currency.users[user] = 0;

  data.currency.users[user] = amount;

  util.json.writeJSONToFile(data, path);
}
/*
** add(guild, user, amount, skipCooldown)
** Description: add to balance of user
*/
function add(guild, user, amount, skipCooldown) {
  if (hasCooldown(user) && !skipCooldown) return; // stop user from gaining currency if a cooldown is active unless it has been specified that the cooldown should be skipped
  addCooldown(user);
  set(guild, user, get(guild, user)+amount);
}
/*
** getCurrencyName(guild)
** Description: get currency name of server
*/
function getCurrencyName(guild) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.currency == undefined) data.currency = {};

  return data.currency.name;
}
/*
** setCurrencyName(guild, name)
** Description: set currency name of server
*/
function setCurrencyName(guild, name) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.currency == undefined) data.currency = {};
  data.currency.name = name;
  util.json.writeJSONToFile(data, path);
}
/*
** getCurrencyName(guild)
** Description: get currency name of server
*/
function getCurrencySymbol(guild) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.currency == undefined) data.currency = {};

  return data.currency.symbol;
}
/*
** setCurrencyName(guild, symbol)
** Description: set currency name of server
*/
function setCurrencySymbol(guild, symbol) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.currency == undefined) data.currency = {};
  data.currency.symbol = symbol;
  util.json.writeJSONToFile(data, path);
}
/*
** topBalances(guild, page)
** Description: gets top balances of server
*/
function topBalances(guild, page) {
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
    if (client.guilds.cache.get(guild).members.cache.get(array[object].id) !== undefined && client.guilds.cache.get(guild).members.get(array[object].id).user.bot) continue; // Skip user if they are a bot
    i++;
    if (i < (page-1)*pageSize+(page-1)) continue; // Page system
    if (i > page*pageSize) break;
    var member = client.guilds.cache.get(guild).members.cache.get(array[object].id);
    if (member == undefined) member = { user: { username: "Unknown", id: array[object].id} }; // Replace username with "Unknown" since we don't know what their real username is
    var string = `${i}. <@${member.user.id}> - ${get(guild, member.user.id)} ${getCurrencyName(guild)}${get(guild, member.user.id) !== 1 ? "s" : ""}\n`;
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
}
function addCooldown(user) {
  activeCooldowns[user] = 20;
}
function hasCooldown(user) {
  if (activeCooldowns[user] == undefined) return false; else return true;
}
/*
** startCooldowns()
** Description: start the cooldown timers
** Comment: called in bot function
*/
function startCooldowns() {
  setInterval(function() {
    for (var user in activeCooldowns) {
      activeCooldowns[user] = activeCooldowns[user] - 1;
      if (activeCooldowns[user] == 0) {
        delete activeCooldowns[user];
      }
    }
  }, 1000);
}

exports.add = add;
exports.set = set;
exports.get = get;
exports.getCurrencyName = getCurrencyName;
exports.setCurrencyName = setCurrencyName;
exports.getCurrencySymbol = getCurrencySymbol;
exports.setCurrencySymbol = setCurrencySymbol;
exports.startCooldowns = startCooldowns;
exports.hasCooldown = hasCooldown;
exports.addCooldown = addCooldown;
exports.topBalances = topBalances;
