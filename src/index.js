const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3333;
const db = require("./infra/dbSqlite");

app.use(express.json());
app.use(cors());

const userController = require("./controller/user.controller");
const taskController = require("./controller/task.controller");

userController(app, db);
taskController(app, db);

app.listen(PORT, () => console.log("🚀 app was stared 🚀"));
