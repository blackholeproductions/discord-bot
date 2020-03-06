const desc = "Add a reminder",
      args = "<time> <reminder>";
const execute = (message, command) => {
  if (command.getArgs().length < 1) return;
  var date = 0;
  var amount = parseInt(command.getArgs()[0]);
  var timescale = command.getArgs()[0].split(amount)[1];
  switch (timescale) {
    case 's':
      date = amount*1000;
      break;
    case 'm':
      date = amount*60000;
      break;
    case 'h':
      date = amount*3600000;
      break;
    case 'd':
      date = amount*86400000;
      break;
    default:
      date = amount;
      break;
  }
  var reminder = command.getArgs().join(' ').substring(command.getArgs()[0].length+1, command.getArgs().join(' ').length);
  util.timers.addReminder(message.author.id, date, reminder);
  message.channel.send(`Added reminder`);
}
exports.desc = desc;
exports.execute = execute;
