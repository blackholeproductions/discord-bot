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
  removeQuestion(guildID, index) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    if (data.questions.list == undefined) data.questions.list = []; // data.questions.list will be an array of objects
    data.questions.list.splice(index, 1);
    util.json.writeJSONToFile(data, path);
  },
  isQuestionValid(guildID, index) {
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    var question = data.questions.list[index-1];
    return question !== undefined;
  },
  postAnswer(guildID, index, answer) {
    index -= 1;
    var path = util.json.getServerJSON(guildID);
    var data = util.json.JSONFromFile(path);
    if (data.questions == undefined) data.questions = {};
    if (data.questions.list == undefined) data.questions.list = [];
    var question = data.questions.list[index].question;
    if (this.getAnswerChannel(guildID) == undefined || !client.guilds.get(guildID).channels.get(this.getAnswerChannel(guildID))) {
      client.guilds.get(guildID).owner.user.send("You have not set your answer channel properly");
      return;
    }
    var channel = client.guilds.get(guildID).channels.get(this.getAnswerChannel(guildID));
    this.removeQuestion(guildID, index);
    channel.send(`**${question}**\n${answer}`);
  },
  listQuestions(guildID, page) {
    var path = util.json.getServerJSON(guildID),
        data = util.json.JSONFromFile(path),
        i = 0,
        pageSize = 10,
        output = "",
        embed = new Discord.RichEmbed();
    if (data.questions == undefined) data.questions = {};
    if (data.questions.list == undefined) data.questions.list = []; // data.questions.list will be an array of objects
    for (var index in data.questions.list) {
      i++;
      if (i < (page-1)*pageSize+(page-1)) continue; // Page system
      if (i > page*pageSize) break;
      output += `[${parseInt(index)+1}] ${data.questions.list[index].question}`;
    }
    if (output == "") output = "No questions found";
    embed.setDescription(output);
    embed.setFooter(`Page ${page}`);
    return embed;
  }
};
