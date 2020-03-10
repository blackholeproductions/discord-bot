const util = require(`${__basedir}/util/util.js`);
module.exports = {
  setAskChannel(guildID, channelID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    data.questions.askChannel = channelID;
    util.json.writeJSONToFile(data, path);
  },
  getAskChannel(guildID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    return data.questions.askChannel;
  },
  setAnswerChannel(guildID, channelID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    data.questions.answerChannel = channelID;
    util.json.writeJSONToFile(data, path);
  },
  getAnswerChannel(guildID) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    return data.questions.answerChannel;
  },
  addQuestion(guildID, userID, question) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    if (data.questions.list == undefined) data.questions.list = []; // data.questions.list will be an array of objects
    data.questions.list.push({ question: question, user: userID, date: new Date(Date.now()) });
    util.json.writeJSONToFile(data, path);
  },
  removeQuestion(guildID, question) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    if (data.questions.list == undefined) data.questions.list = []; // data.questions.list will be an array of objects
    for (var index in data.questions.list) {
      if (data.questions.list[index].question == question) {
        data.questions.list.splice(index, 1);
        break;
      }
    }
    util.json.writeJSONToFile(data, path);
  },
  postAnswer(guildID, question, answer) {
    var channel = client.guilds.get(guildID).channels.get(getAnswerChannel(guildID));
    if (getAnswerChannel(guildID) == undefined || !channel) {
      client.guilds.get(guildID).owner.user.send("You have not set your answer channel properly");
      return;
    }
    removeQuestion(question);
    channel.send(`**${question}**\n${answer}`);
  },
  listQuestions(guildID) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path),
        i = 0,
        output = "";
    if (data.questions == undefined) data.questions = {};
    if (data.questions.list == undefined) data.questions.list = []; // data.questions.list will be an array of objects
    for (var index in data.questions.list) {
      i++;
      if (i < (page-1)*pageSize+(page-1)) continue; // Page system
      if (i > page*pageSize) break;
      output += `[${index}] ${data.questions.list[index].question}`;
    }
    data.questions.list.push({ question: question, user: userID, date: new Date(Date.now()) });
    util.json.writeJSONToFile(data, path);
  }
};
