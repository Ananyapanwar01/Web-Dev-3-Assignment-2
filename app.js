const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Student Management REST API"
  });
});


app.use("/students", studentRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);

 
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
