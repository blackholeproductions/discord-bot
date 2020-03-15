module.exports = {
  desc: "Toggles confirmation messages for moderation actions",
  execute(message, command) {
    util.moderation.toggleConfirmations(message.author.id);
    message.channel.send(`Confirmation messages ${util.moderation.confirmationsEnabled(message.author.id) ? "enabled" : "disabled"}`);
  }
}
