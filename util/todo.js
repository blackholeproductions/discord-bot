const util = require(`${__basedir}/util/util.js`);

/*
** add(id, item, project)
** Description: adds todo thingy to the project of user
*/
function add(id, item, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    console.error(`Invalid project ${project} was specified`);
    return;
  }
  if (data.todo[project][item] == undefined) data.todo[project][item] = {};
  data.todo[project][item].start = new Date(Date.now());
  util.json.writeJSONToFile(data, path);
}
/*
** get(id, item, project)
** Description: gets todo thingy from the project of user
*/
function get(id, item, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    console.error(`Invalid project ${project} was specified`);
    return;
  }
  if (data.todo[project][item] == undefined) return 'Item does not exist';
  return data.todo[project][item].start;
}
/*
** remove(id, item, project)
** Description: removes todo thingy from the project of user
*/
function remove(id, item, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    console.error(`Invalid project ${project} was specified`);
    return;
  }
  delete data.todo[project][item];
  util.json.writeJSONToFile(data, path);
}

/*
** createProject(id, project)
** Description: creates a project for user
*/
function createProject(id, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  data.todo[project] = {};
  util.json.writeJSONToFile(data, path);
}
/*
** projectList(id, page)
** Description: gets a list of projects from user
*/
function projectList(id, page) {
  var path = util.json.getUserJSON(id),
      data = util.json.JSONFromFile(path),
      pageSize = 10,
      i = 0,
      list = "",
      embed = new Discord.MessageEmbed();
  if (data.todo == undefined) data.todo = {};
  embed.setTitle(`${client.users.cache.get(id).username}'s Project List`);
  for (var project in data.todo) {
    i++;
    if (i < (page-1)*pageSize+(page-1)) continue; // Page system
    if (i > page*pageSize) break;
    var length = Object.keys(data.todo[project]).length;
    list += `**${project}** - ${length} item${length !== 1 ? "s" : ""}\n`;
  }
  embed.setDescription(list)
       .setFooter(`Page ${page}`);
  return embed;
}

/*
** projectExists(id, project)
** Description: checks if a user has a project
*/
function projectExists(id, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] !== undefined) return true;
  return false;
}
/*
** complete(id, item, project)
** Description: sets an item in a project to complete
*/
function complete(id, item, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    console.error(`Invalid project ${project} was specified`);
    return;
  }
  if (data.todo[project][item] == undefined) return;
  data.todo[project][item].end = new Date(Date.now());
  util.json.writeJSONToFile(data, path);
}
/*
** isCompleted(id, item, project)
** Description: checks if an item in a project is complete
*/
function isCompleted(id, item, project) {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    console.error(`Invalid project ${project} was specified`);
    return;
  }
  if (data.todo[project][item] == undefined) return false
  if (data.todo[project][item].end !== undefined) return true;
  return false;
}
/*
** getList(id, page, project)
** Description: gets a project's todo list
*/
function getList(id, page, project) {
  var path = util.json.getUserJSON(id),
      data = util.json.JSONFromFile(path),
      pageSize = 10,
      list = "",
      i = 0,
      embed = new Discord.MessageEmbed();
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    return "Invalid project";
  }
  embed.setTitle(`${project} to-do List`);
  for (var item in data.todo[project]) {
    var selecteditem = data.todo[project][item];
    i++;
    if (i < (page-1)*pageSize+1) continue; // Page system
    if (i > page*pageSize) break;
    list += `[${i}] ${selecteditem.end !== undefined ? `~~${item}~~` : `${item}`} ${selecteditem.end !== undefined ? `\`(Started ${new Date(selecteditem.start).toLocaleDateString("en-US")}, Finished ${new Date(selecteditem.end).toLocaleDateString("en-US")})\`` : ""}\n`
  }
  embed.setDescription(list)
       .setFooter(`Page ${page}`);
  return embed;
}
/*
** getItem(id, index, project)
** Description: gets an item in a project based on index
*/
function getItem(id, index, project) {
  var path = util.json.getUserJSON(id),
      data = util.json.JSONFromFile(path),
      i = 0;
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    return "Invalid project";
  }
  for (var item in data.todo[project]) {
    i++;
    if (i == index) return item;
  }
}
/*
** setItem(id, index, item, project)
** Description: sets an item in a project based on index
*/
function setItem(id, index, item, project) {
  var path = util.json.getUserJSON(id),
      data = util.json.JSONFromFile(path),
      i = 0;
  if (data.todo == undefined) data.todo = {};
  if (data.todo[project] == undefined) {
    return "Invalid project";
  }
  var oldItem = "";
  for (var selecteditem in data.todo[project]) {
    i++;
    if (i == index) oldItem = selecteditem; // get item at index and store it in oldItem for removal later
  }
  if (oldItem == "") return; // Handle index not being found
  if (data.todo[project][oldItem] == undefined) return; // Handle non-existent project

  var itemData = data.todo[project][oldItem]; // Save item data
  delete data.todo[project][oldItem]; // Delete old item
  data.todo[project][item] = itemData; // Save new item with old data
  util.json.writeJSONToFile(data, path);
}
exports.setItem = setItem;
exports.getItem = getItem;
exports.projectList = projectList;
exports.get = get;
exports.add = add;
exports.remove = remove;
exports.isCompleted = isCompleted;
exports.createProject = createProject;
exports.projectExists = projectExists;
exports.complete = complete;
exports.getList = getList;
