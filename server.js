// const { Sequelize } = require("sequelize");
const app = require("./app");
const PORT = process.env.PORT || 2025;
const db = require("./models/index");

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch(() => console.log("Database not connected.."));

app.listen(PORT, () =>
  console.log(`Server running at 'http://localhost:${PORT}'`)
);
