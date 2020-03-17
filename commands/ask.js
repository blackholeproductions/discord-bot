var yesNoResponse = [
  "Yes", "Definitely", "Absolutely", "Affirmative",
  "No", "Definitely not", "Don't even think about it", "Negative"
];
var yesNoQuestions = [
  "should", "are", "does", "have", "can", "was", "were", "am", "is", "has", "do", "did", "could", "may", "will"
]
module.exports = {
  desc: "Ask the bot a question",
  args: "<question>",
  execute(message, command) {
    var question = command.getArgs().join(' ').toLowerCase();
    var answered = false;
    for (var index in yesNoQuestions) {
      if (question.startsWith(yesNoQuestions[index]) && question !== yesNoQuestions[index] && !answered) {
        answered = true;
        message.reply(yesNoResponse[util.general.generateRandomNumber(0, yesNoResponse.length-1)]);
      }
    }
    if (!answered) {
      message.reply("I cannot answer that question");
    }
  }
}
