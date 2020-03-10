module.exports = {
  desc: "Answer a question",
  args: "<index>",
  permission: "MANAGE_GUILD",
  execute(message, command) {
    var index = command.getArgs()[0];
    var answer = command.getArgs().join(' ').substring(index.length+1, command.getArgs().join(' ').length);
    if (!util.questions.isQuestionValid(message.guild.id, index)) {
      message.author.send(`${index} is not a valid index`);
      return;
    }
    if (command.getArgs().length > 0) {
      util.questions.postAnswer(message.guild.id, index, answer);
      message.author.send(`Posted answer in answer channel`);
      message.delete(1000);
    } else {
      message.channel.send("You must specify a question to ask");
    }
  }
}
