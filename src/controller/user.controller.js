const userModel = require("../model/user.model");
const UserDao = require("../dao/user.dao");

function userController(app, bd) {
  const userDao = new UserDao(bd);
  app.get("/user/:email", (req, res) => {
    const { email } = req.params;
    userDao
      .listForEmail(email)
      .then((user) => res.send(user))
      .catch((err) => res.send({ mensagem: err }));
  });

  app.get("/user", async (_, res) => {
    try {
      let result = await userDao.listUser();
      res.send(result);
    } catch (error) {
      res.send(503).send({ mensagem: error });
    }
  });

  app.post("/user", (req, res) => {
    const { name, email, password } = req.body;
    let user = new userModel({
      email,
      name,
      password,
    });
    userDao
      .insertUser(user)
      .then((insertUser) => {
        res.status(201).send({ mensagem: insertUser });
      })
      .catch((err) => res.send({ mensagem: err }));
  });

  app.put("/user/:email", (req, res) => {
    let { email } = req.params;
    userDao
      .changesUser(email, req.body)
      .then((messageSuccess) => res.send({ mensagem: messageSuccess }))
      .catch((messageFailure) => res.send({ mensagem: messageFailure }));
  });

  app.delete("/user/:email", (req, res) => {
    let { email } = req.params;
    userDao
      .deleteUser(email)
      .then((messageSuccess) => res.send({ mensagem: messageSuccess }))
      .catch((messageFailure) => res.send({ mensagem: messageFailure }));
  });
}

module.exports = userController;
