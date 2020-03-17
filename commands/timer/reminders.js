module.exports = {
  desc: "List reminders",
  args: "<user>",
  async execute(message, command) {
    var user = message.mentions.users.first() || client.users.cache.find(user => user.username ===  command.getArgs().join(" ")) || message.author;
    const m = await message.channel.send(util.timers.listReminders(message.author.id));
    util.pages.addPageMessage(m.id, m.channel.id, message.author.id, page, "reminderList");
  }
}
