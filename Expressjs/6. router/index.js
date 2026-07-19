import express from "express";
import student from "./routes/student.js";
import teacher from "./routes/teacher.js";

const app = express();

// Load Router Modules
app.use("/student", student);
app.use("/teacher", teacher);

app.listen(8000, () => console.log("Server Up!"));
