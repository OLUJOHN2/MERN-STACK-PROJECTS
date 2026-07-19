const express = require("express");
const app = express();

// app.get("/product", (req, res) => {
//   console.log(req.query);
//   res.send(`Response Ok ${req.query.category}`);
// });

// Destructuring
// app.get("/product", (req, res) => {
//   const { category } = req.query;
//   res.send(`Product Category ${category}`);
// });

// Multiple Query String
app.get("/product", (req, res) => {
  const { category, id } = req.query;
  res.send(`Product Category ${category} & Product ID: ${id}`);
});

app.listen(8000, () => console.log("Server Up!"));
