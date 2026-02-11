const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Express server is running",
    port: PORT,
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const { role = "guest", active = "true" } = req.query;

  res.json({
    message: "Received params and query",
    params: { id },
    query: { role, active },
  });
});

app.post("/messages", (req, res) => {
  const { title, content } = req.body;

  res.status(201).json({
    message: "Received body data",
    body: { title, content },
  });
});

function startServer(port = PORT) {
  return app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
