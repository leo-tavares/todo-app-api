const taskModel = require("../model/task.model");
const Dao = require("../dao/task.dao");

function taskController(app, bd) {
  const taskDao = new Dao(bd);

  app.get("/task", (_, res) => {
    taskDao
      .listTask()
      .then((task) => res.send(task))
      .catch((err) => res.send(err));
  });

  app.get("/task/:title", (req, res) => {
    const { title } = req.params;
    taskDao
      .listTaskForTitle(title)
      .then((titulo) => res.send(titulo))
      .catch((err) => res.send({ mensagem: `Erro na consulta` }));
  });

  app.post("/task", (req, res) => {
    const { title, data, description, id_user, status } = req.body;
    const task = new taskModel({
      title,
      data,
      description,
      id_user,
      status,
    });
    taskDao
      .insertTask(task)
      .then((tarefas) => res.send({ mensagem: tarefas }))
      .catch((err) => res.send({ mensagem: err }));
  });

  app.put("/task/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    taskDao
      .changesTask(id, body)
      .then((success) => res.send({ mensagem: success }))
      .catch((err) => res.send({ mensagem: err }));
  });

  app.delete("/task/:title", (req, res) => {
    let title = req.params.title;
    taskDao
      .deleteTask(title)
      .then((success) => res.send({ mensagem: success }))
      .catch((err) => res.send({ mensagem: err }));
  });
}
module.exports = taskController;
