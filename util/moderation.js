
var confirmations = {};
module.exports = {
  ban(guildID, userID, reason) {
    var member = client.guilds.cache.get(guildID).members.cache.get(userID);
    if (member == undefined) return 'Unable to find member';
    member.ban({ days: 7, reason: reason })
      .then(function(a) {
        return `Banned ${member.user.username}`;
      })
      .catch(function(err) {
        return err;
      });
  },
  kick(guildID, userID, reason) {
    var member = client.guilds.cache.get(guildID).members.cache.get(userID);
    if (member == undefined) return 'Unable to find member';
    member.kick({ reason: reason })
      .then(function(a) {
        return `Kicked ${member.user.username}`;
      })
      .catch(function(err) {
        return err;
      });
  },
  setConfirmation(userID, guildID, action, data) {
    if (confirmations[guildID] == undefined) confirmations[guildID] = {};
    confirmations[guildID][userID] = {
      action: action,
      data: data
    }
  },
  confirm(guildID, userID) {
    if (confirmations[guildID][userID] !== undefined) {
      var con = confirmations[guildID][userID];
      console.log(con);
      switch(con.action) {
        case 'ban':
          this.ban(guildID, con.data.userID, con.data.reason);
          break;
        case 'kick':
          console.log(this.kick(guildID, con.data.userID, con.data.reason));
          break;
      }
      delete confirmations[userID];
    }
  },
  hasConfirmation(guildID, userID) {
    if (confirmations[guildID] !== undefined && confirmations[guildID][userID] !== undefined) return true;
    return false;
  },
  removeConfirmation(guildID, userID) {
    if (confirmations[guildID][userID] !== undefined) delete confirmations[guildID][userID];
  },
  toggleConfirmations(userID) {
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
  },
  confirmationsEnabled(userID) {
    var path = util.json.getUserJSON(userID);
    var data = util.json.JSONFromFile(path);
    if (data.confirmations) return true;
    return false;
  }
}
