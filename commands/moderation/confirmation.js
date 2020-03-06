const desc = "Toggles confirmation messages for moderation actions";
const execute = (message, command) => {
  util.moderation.toggleConfirmations(message.author.id);
  message.channel.send(`Confirmation messages ${util.moderation.confirmationsEnabled(message.author.id) ? "enabled" : "disabled"}`);
}
exports.desc = desc;
exports.execute = execute;
