module.exports = {
  desc: "Check a timer",
  execute(message, command) {
    var time = util.timers.getTime(message.author.id);
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    while (time >= 86400000) {
      time -= 86400000;
      days += 1;
    }
    while (time >= 3600000) {
      time -= 3600000;
      hours += 1;
    }
    while (time >= 60000) {
      time -= 60000;
      minutes += 1;
    }
    while (time >= 1000) {
      time -= 1000;
      seconds += 1;
    }
    message.channel.send(`${days ? `${days} days ` : ""}${hours ? `${hours} hours ` : ""}${minutes ? `${minutes} minutes and ` : ""}${seconds}.${time.toString().substring(0,2)} seconds`);
  }
}
