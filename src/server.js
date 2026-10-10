require("dotenv").config();

const app = require("./app");
const connectToDatabase = require("./config/database");

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Event Registration API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
  process.exitCode = 1;
});
