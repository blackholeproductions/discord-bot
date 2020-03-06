const util = require(`${__basedir}/util/util.js`);
var confirmations = {};
function ban(guildID, userID, reason) {
  var member = client.guilds.get(guildID).members.get(userID);
  if (member == undefined) return 'Unable to find member';
  member.ban({ days: 7, reason: reason })
    .then(function(a) {
      return `Banned ${member.user.username}`;
    })
    .catch(function(err) {
      return err;
    });
}
function kick(guildID, userID, reason) {
  var member = client.guilds.get(guildID).members.get(userID);
  if (member == undefined) return 'Unable to find member';
  member.kick({ reason: reason })
    .then(function(a) {
      return `Kicked ${member.user.username}`;
    })
    .catch(function(err) {
      return err;
    });
}
function setConfirmation(userID, guildID, action, data) {
  if (confirmations[guildID] == undefined) confirmations[guildID] = {};
  confirmations[guildID][userID] = {
    action: action,
    data: data
  }
}
function confirm(guildID, userID) {
  if (confirmations[guildID][userID] !== undefined) {
    var con = confirmations[guildID][userID];
    console.log(con);
    switch(con.action) {
      case 'ban':
        ban(guildID, con.data.userID, con.data.reason);
        break;
      case 'kick':
        console.log(kick(guildID, con.data.userID, con.data.reason));
        break;
    }
    delete confirmations[userID];
  }
}
function hasConfirmation(guildID, userID) {
  if (confirmations[guildID] !== undefined && confirmations[guildID][userID] !== undefined) return true;
  return false;
}
function removeConfirmation(guildID, userID) {
  if (confirmations[guildID][userID] !== undefined) delete confirmations[guildID][userID];
}
function toggleConfirmations(userID) {
  var path = util.json.getUserJSON(userID);
  var data = util.json.JSONFromFile(path);
  if (data.confirmations == undefined) {
    data.confirmations = true;
  } else if (data.confirmations) {
    data.confirmations = false;
  } else if (!data.confirmations) {
    data.confirmations = true;
  }
  util.json.writeJSONToFile(data, path);
}
function confirmationsEnabled(userID) {
  var path = util.json.getUserJSON(userID);
  var data = util.json.JSONFromFile(path);
  if (data.confirmations) return true;
  return false;
}

exports.hasConfirmation = hasConfirmation;
exports.ban = ban;
exports.kick = kick;
exports.confirmationsEnabled = confirmationsEnabled;
exports.toggleConfirmations = toggleConfirmations;
exports.removeConfirmation = removeConfirmation;
exports.confirm = confirm;
exports.setConfirmation = setConfirmation;
