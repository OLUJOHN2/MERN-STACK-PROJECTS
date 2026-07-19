import express from "express";
const app = express();

// usual code
// app.get('/student', (req, res) => {
//   res.send('All Student')
// })

// app.post('/student', (req, res) => {
//   res.send('Add new Student')
// })

// app.put('/student', (req, res) => {
//   res.send('Add new Student')
// })

// Refactor
app
  .route("/student")
  .get((req, res) => res.send("All Students"))
  .post((req, res) => res.send("Add new Student"))
  .put((req, res) => res.send("Update Student"))
  .delete((req, res) => res.send("Remove Student"));

app.listen(8000, () => console.log("Server Up!"));
