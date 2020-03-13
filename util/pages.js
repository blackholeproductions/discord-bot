const util = require(`${__basedir}/util/util.js`);
var messages = {};
/*
** addPageMessage(messageID, channelID, pageNumber, type, extraData)
** Description: add message into messages object
*/
function addPageMessage(messageID, channelID, authorID, pageNumber, type, extraData) {
  if (messages[messageID] == undefined) messages[messageID] = {};
  messages[messageID].page = pageNumber;
  messages[messageID].channel = channelID;
  messages[messageID].author = authorID;
  messages[messageID].type = type;
  for (var data in extraData) {
    messages[messageID][data] = extraData[data]; // god this is confusing, but it adds each property in extraData object to the message object
  }
  var message = client.channels.cache.get(messages[messageID].channel).messages.cache.get(messageID);
  message.react("⬅️")
    .then(() => message.react('➡️'))
    .catch(() => console.error("Wasn't able to react to page command properly"));
}
/*
** handlePages(reaction, user)
** Description: handle page switching via reactions
** Comment: in bot.js
*/
function handlePages(reaction, user) {
  if (messages[reaction.message.id] == undefined) return; // Handle messages that are no longer tracked by the bot
  if (user.id !== messages[reaction.message.id].author) return; // Ignore if the user is not the original author of the command
  var pageChange = 0;
  if (reaction.emoji.toString() == "⬅️") messages[reaction.message.id].page -= 1;
  if (reaction.emoji.toString() == "➡️") messages[reaction.message.id].page += 1;
  if (messages[reaction.message.id].page + pageChange < 1) messages[reaction.message.id].page = 1; // page 0 and below is always invalid
  updateMessage(reaction.message.id, messages[reaction.message.id].type, messages[reaction.message.id].page);
}
/*
** updateMessage(messageID, type, page)
** Description: update a message
*/
function updateMessage(messageID, type, page) {
  if (messages[messageID] == undefined) return; // cant update a message that doesnt exist
  var message = client.channels.cache.get(messages[messageID].channel).messages.cache.get(messageID);
  var type = messages[messageID].type;
  switch(type) {
    case "leaderboard":
      message.edit(util.xp.getLeaderboard(message.guild.id, page, messages[messageID].bot));
      break;
    case "devlog":
      message.edit(util.getDevlog(page, messages[messageID].day));
      break;
    case "help":
      message.edit(util.getHelpMenu(messages[messageID].guild, message.author.id, page, messages[messageID].helpType, messages[messageID].mod));
      break;
    case "levelUpMessages":
      message.edit(util.xp.formatLevelUpMessages(message.guild.id, messages[messageID].user.id, page));
      break;
    case "todoList":
      message.edit(util.todo.getList(messages[messageID].id, page, messages[messageID].project));
      break;
    case "todoProjectList":
      message.edit(util.todo.projectList(messages[messageID].id, page));
      break;
    case "activity":
      message.edit(util.xp.getXPHistory(message.guild.id, messages[messageID].id, page));
      break;
    case "baltop":
      message.edit(util.currency.topBalances(message.guild.id, page));
      break;
    case "gbaltop":
      message.edit(util.currency.topGlobalBalances(page));
      break;
    case "global-leaderboard":
      message.edit(util.xp.getGlobalLeaderboard(page));
      break;
    case "questionsList":
      message.edit(util.questions.listQuestions(message.guild.id, page));
      break;
    case "serverStoreItems":
      message.edit(util.currency.listStoreItems(message.guild.id, page));
      break;
    default:
      message.edit(`something has gone horribly wrong.\n\`\`\`${messages[reaction.message.id]}\`\`\``);
      break;
  }
}

exports.addPageMessage = addPageMessage;
exports.handlePages = handlePages;
exports.updateMessage = updateMessage;
