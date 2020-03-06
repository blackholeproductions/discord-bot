const util = require(`${__basedir}/util/util.js`);
/*
** propose(guild, asker, target)
** Description: adds user to propose list
*/
function propose(guild, asker, target) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.marriage == undefined) data.marriage = {};
  if (data.marriage.proposals == undefined) data.marriage.proposals = {};
  data.marriage.proposals[asker] = target;
  util.json.writeJSONToFile(data, path);
}
/*
** reject(guild, target, asker)
** Description: removes user from propose list
*/
function reject(guild, target, asker) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.marriage == undefined) data.marriage = {};
  if (data.marriage.proposals == undefined) data.marriage.proposals = {};
  if (data.marriage.proposals[asker] == target) delete data.marriage.proposals[asker];
  util.json.writeJSONToFile(data, path);
}
/*
** accept(guild, target, asker)
** Description: removes user from propose list & adds to married list
*/
function accept(guild, target, asker) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.marriage == undefined) data.marriage = {};
  if (data.marriage.proposals == undefined) data.marriage.proposals = {};
  console.log(asker);
  if (data.marriage.proposals[asker] == target) {
    if (data.marriage.marriages == undefined) data.marriage.marriages = {};
    delete data.marriage.proposals[asker];
    data.marriage.marriages[target] = asker;
    data.marriage.marriages[asker] = target;
  }
  util.json.writeJSONToFile(data, path);
}
/*
** accept(guild, target, asker)
** Description: removes user from married list
*/
function divorce(guild, divorcer, sadperson) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.marriage == undefined) data.marriage = {};
  if (data.marriage.marriages == undefined) data.marriage.marriages = {};
  if (data.marriage.marriages[divorcer] == sadperson && data.marriage.marriages[sadperson] == divorcer) {
    delete data.marriage.marriages[divorcer];
    delete data.marriage.marriages[sadperson];
  }
  util.json.writeJSONToFile(data, path);
}
/*
** getSpouse(guild, target)
** Description: gets id of spouse
*/
function getSpouse(guild, target) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.marriage == undefined) data.marriage = {};
  if (data.marriage.marriages == undefined) data.marriage.marriages = {};
  return data.marriage.marriages[target];
}
/*
** isProposing(guild, target, asker)
** Description: checks if a user is proposing to another
*/
function isProposing(guild, asker, target) {
  var path = util.json.getServerJSON(guild);
  var data = util.json.JSONFromFile(path);
  if (data.marriage == undefined) data.marriage = {};
  if (data.marriage.marriages == undefined) data.marriage.marriages = {};
  if (data.marriage.proposals[asker] == target) return true;
  return false;
}

exports.isProposing = isProposing;
exports.getSpouse = getSpouse;
exports.propose = propose;
exports.accept = accept;
exports.reject = reject;
exports.divorce = divorce;
exports.getSpouse = getSpouse;
