class UserDao {
  constructor(bd) {
    this.bd = bd;
  }
  listUser() {
    return new Promise((result, reject) => {
      this.bd.all(`SELECT * FROM USUARIOS`, (err, data) => {
        if (err) {
          reject("Falha ao listar os usuários aí");
        } else {
          result(data);
        }
      });
    });
  }
  listForEmail(email) {
    return new Promise((result, reject) => {
      this.bd.all(
        "SELECT * FROM USUARIOS WHERE EMAIL = (?)",
        [email],
        (err, usuarios) => {
          if (err) {
            reject("Falha ao listar os usuários aí");
          } else {
            result(usuarios);
          }
        }
      );
    });
  }
  insertUser(user) {
    return new Promise((result, reject) => {
      this.bd.run(
        "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)",
        [user.name, user.email, user.password],
        (err) => {
          if (err) reject(`Erro ao cadastrar Usuário`);
          else result("Inserido com sucesso");
        }
      );
    });
  }
  changesUser(user, { NOME, SENHA }) {
    return new Promise((result, reject) => {
      this.bd.run(
        "UPDATE USUARIOS SET NOME = (?), SENHA = (?) WHERE EMAIL = (?)",
        [NOME, SENHA, user],
        (err) => {
          if (err) {
            reject("Erro ao alterar usuário");
          } else {
            result("Usuário alterado com sucesso!");
          }
        }
      );
    });
  }
  deleteUser(user) {
    return new Promise((result, reject) => {
      this.bd.run("DELETE FROM USUARIOS WHERE EMAIL = (?)", [user], (err) => {
        if (err) reject("Erro ao deletar usuário");
        else result("Usuário deletado com sucesso!");
      });
    });
  }
}

module.exports = UserDao;
