class TaskDAO {
  constructor(bd) {
    this.bd = bd;
  }
  listTask() {
    return new Promise((result, reject) => {
      this.bd.all("SELECT * FROM TAREFAS", (err, tarefa) => {
        if (err) {
          reject(err);
        } else {
          result(tarefa);
        }
      });
    });
  }

  listTaskForTitle(titulo) {
    return new Promise((result, reject) => {
      this.bd.all(
        "SELECT * FROM TAREFAS WHERE TITULO = (?)",
        [titulo],
        (err, titulo) => {
          if (err) {
            reject(err);
          } else {
            result(titulo);
          }
        }
      );
    });
  }

  insertTask(task) {
    return new Promise((result, reject) => {
      this.bd.run(
        "INSERT INTO TAREFAS (TITULO, DESCRICAO, STATUS, DATACRIACAO, ID_USUARIO) VALUES (?,?,?,?,?)",
        [task.title, task.description, task.status, task.data, task.id_user],
        (err) => {
          if (err) {
            reject(`Falha ao inserir `);
          } else {
            result("Tarefa inserida com sucesso");
          }
        }
      );
    });
  }

  deleteTask(titulo) {
    return new Promise((result, reject) => {
      this.bd.run("DELETE FROM TAREFAS WHERE TITULO = (?)", [titulo], (err) => {
        if (err) reject("Falha ao deletar tarefa");
        else result("tarefa deletada com sucesso");
      }); 
    });
  }

  changesTask(id, body) {
    return new Promise((result, reject) => {
      this.bd.run(
        "UPDATE TAREFAS SET STATUS = (?), DESCRICAO = (?) WHERE ID = (?)",
        [body.STATUS, body.DESCRICAO, id],
        (err) => {
          if (err) reject("Falha ao alterar tarefa " + err);
          else result("Tarefa alterado com sucesso");
        }
      );
    });
  }
}

module.exports = TaskDAO;
