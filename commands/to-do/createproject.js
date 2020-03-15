module.exports = {
  desc: "Create a project",
  args: `<project>`,
  async execute(message, command) {
    var page = 1;
    var project = command.getArgs().join(" ");
    if (util.todo.projectExists(message.author.id, project)) {
      message.channel.send("That project already exists");
      return;
    } else {
      util.todo.createProject(message.author.id, project);
      message.channel.send(`Created project **${project}**!`);
    }
  }
}
