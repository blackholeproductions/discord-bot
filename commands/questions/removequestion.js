module.exports = {
  desc: "Remove a question",
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
      util.questions.removeQuestion(message.guild.id, index-1);
      message.author.send(`Removed question at index ${index}`);
    } else {
      message.channel.send("You must specify an index to ask");
    }
  }
}
