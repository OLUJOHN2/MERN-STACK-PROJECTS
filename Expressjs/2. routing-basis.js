import express from "express";
const app = express();

// BASIC ROUTES
app.get("/", (req, res) => {
  res.send("<h1>HOME 🏠 </h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>ABOUT 😶‍🌫️ </h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>CONTACT 📲 </h1>");
});

app.get("/work", (req, res) => {
  res.send("<h1>MY WORK 💪 </h1>");
});

app.listen(3000, () => console.log("Server Up!"));
