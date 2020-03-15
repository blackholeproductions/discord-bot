
var activeTimers = {};
var activeReminders = {};
module.exports = {
  tick() {
    for (var user in activeTimers) {
      if (isNaN(user)) continue; // skip any non-users
      activeTimers[user].value += 10;
    }
  },
  reminderTick() {
    for (var user in activeReminders) {
      if (isNaN(user)) continue; // skip any non-users
      for (var date in activeReminders[user]) {
        if (Date.parse(date) <= new Date(Date.now())) this.remind(user, date);
      }
    }
  },
  startTimers() {
    this.load();
    var timerInterval = setInterval(function() {
      util.timers.tick();
    }, 10);
    var reminderInterval = setInterval(function() {
      util.timers.reminderTick();
    }, 1000);
    var saveInterval = setInterval(function() {
      util.timers.save();
    }, 10000)
  },
  addTimer(userID) {
    activeTimers[userID] = {};
    activeTimers[userID].value = 0;
  },
  removeTimer(userID) {
    if (activeTimers[userID] == undefined) return 0;
    var timer = activeTimers[userID];
    delete activeTimers[userID];
    return timer.value;
  },
  getTime(userID) {
    if (activeTimers[userID] == undefined) return 0;
    var timer = activeTimers[userID];
    return timer.value;
  },
  save() {
    var path = `${__basedir}/data/bot/timers.json`;
    var data = util.json.JSONFromFile(path);
    data.timers = activeTimers;
    data.reminders = activeReminders;
    data.exitTime = new Date(Date.now());
    util.json.writeJSONToFile(data, path);
  },
  load() {
    var data = util.json.JSONFromFile(`${__basedir}/data/bot/timers.json`);
    var offset = new Date(Date.now()) - new Date(data.exitTime); // get time since bot last saved
    for (var user in data.timers) {
      var current = data.timers[user].value;
      data.timers[user].value = current + offset; // add time to each timer
    }
    activeTimers = data.timers || {}; // move data to object
    activeReminders = data.reminders || {};
    delete data.exitTime;
  },
  addReminder(userID, date, reminder) {
    if (activeReminders[userID] == undefined) activeReminders[userID] = {};
    activeReminders[userID][new Date(Date.now()+date)] = reminder;
  },
  cancelReminder(userID, date) {
    if (activeReminders[userID] == undefined) return;
    if (activeReminders[userID][date] == undefined) return;
    delete activeReminders[userID][date];
  },
  remind(userID, date) {
    var user = client.users.cache.get(userID);
    if (!user) return;
    user.send(`${activeReminders[userID][date]}`);
    this.cancelReminder(userID, date);
  }
}
