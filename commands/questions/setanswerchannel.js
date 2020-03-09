module.exports = {
  desc: "Set the answer channel to the channel that this command is run in",
  execute(message, command) {
    util.questions.setAnswerChannel(message.guild.id, message.channel.id);
    message.channel.send("Set channel");
  }
}
