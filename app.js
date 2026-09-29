const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Custom logger middleware (applied to every request)
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running.",
    endpoints: {
      getAllStudents: "GET /students",
      getStudentById: "GET /students/:id",
      createStudent: "POST /students",
      updateStudent: "PUT /students/:id",
      deleteStudent: "DELETE /students/:id",
    },
  });
});

// Modular routing for students
app.use("/students", studentRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
