const util = require(`${__basedir}/util/util.js`);
var activeTimers = {};
var activeReminders = {};
function tick() {
  for (var user in activeTimers) {
    if (isNaN(user)) continue; // skip any non-users
    activeTimers[user].value += 10;
  }
}
function reminderTick() {
  for (var user in activeReminders) {
    if (isNaN(user)) continue; // skip any non-users
    for (var date in activeReminders[user]) {
      if (Date.parse(date) <= new Date(Date.now())) remind(user, date);
    }
  }
}

function startTimers() {
  load();
  var timerInterval = setInterval(function() {
    tick();
  }, 10);
  var reminderInterval = setInterval(function() {
    reminderTick();
  }, 1000);
  var saveInterval = setInterval(function() {
    save();
  }, 10000)
}
function addTimer(userID) {
  activeTimers[userID] = {};
  activeTimers[userID].value = 0;
}
function removeTimer(userID) {
  if (activeTimers[userID] == undefined) return 0;
  var timer = activeTimers[userID];
  delete activeTimers[userID];
  return timer.value;
}
function getTime(userID) {
  if (activeTimers[userID] == undefined) return 0;
  var timer = activeTimers[userID];
  return timer.value;
}
function save() {
  var path = `${__basedir}/data/bot/timers.json`;
  var data = util.json.JSONFromFile(path);
  data.timers = activeTimers;
  data.reminders = activeReminders;
  data.exitTime = new Date(Date.now());
  util.json.writeJSONToFile(data, path);
}
function load() {
  var data = util.json.JSONFromFile(`${__basedir}/data/bot/timers.json`);
  var offset = new Date(Date.now()) - new Date(data.exitTime); // get time since bot last saved
  for (var user in data.timers) {
    var current = data.timers[user].value;
    data.timers[user].value = current + offset; // add time to each timer
  }
  activeTimers = data.timers || {}; // move data to object
  activeReminders = data.reminders || {};
  delete data.exitTime;
}
function addReminder(userID, date, reminder) {
  if (activeReminders[userID] == undefined) activeReminders[userID] = {};
  activeReminders[userID][new Date(Date.now()+date)] = reminder;
}
function cancelReminder(userID, date) {
  if (activeReminders[userID] == undefined) return;
  if (activeReminders[userID][date] == undefined) return;
  delete activeReminders[userID][date];
}
function remind(userID, date) {
  var user = client.users.get(userID);
  if (!user) return;
  user.send(`${activeReminders[userID][date]}`);
  cancelReminder(userID, date);
}

exports.addReminder = addReminder;
exports.cancelReminder = cancelReminder;
exports.getTime = getTime;
exports.startTimers = startTimers;
exports.addTimer = addTimer;
exports.removeTimer = removeTimer;
exports.tick = tick;
