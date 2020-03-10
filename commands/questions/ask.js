module.exports = {
  desc: "Ask a question",
  args: "<question>",
  execute(message, command) {
    if (command.getArgs().length > 0) {
      util.questions.addQuestion(message.guild.id, message.author.id, command.getArgs().join(' '));
      message.author.send(`Your question "${command.getArgs().join(' ')}" has been submitted.`);
      message.delete(1000);
    } else {
      message.channel.send("You must specify a question to ask");
    }
  }
}
