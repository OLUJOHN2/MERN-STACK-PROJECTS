const express = require("express");
const app = express();

// Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the (req.params) object, with the name of the route parameter specified in the path as their respective keys.

// Getting Route Params
// app.get("/student/delete/:id", (req, res) => {
//   // console.log(req.params);
//   // const { id } = req.params;
//   res.send(`Student No: ${req.params.id} delete.`);
// });

// Destructuring Route Params
// app.get("/student/delete/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(`Student No: ${id} delete.`);
// });

// Passing Multiple Route Params
// app.get("/product/:category/:id", (req, res) => {
//   const { category, id } = req.params;
//   res.send(`Product Category: (${category}), Product Id: (${id})`);
// });

// Complexcity
// app.get("/product/order/:day/:month/and/:year", (req, res) => {
//   const { day, month, year } = req.params;
//   res.send(`Product was ordered on: ${day}/${month}/${year}`);
// });

app.param("id", (req, res, next, id) => {
  console.log(`id: ${id}`);
  next();
});

app.get("/user/:id", (req, res) => {
  console.log("This is User ID Path");
  res.send("Response Ok");
});
// -----------------------

app.listen(8000, () => console.log("Server Up!"));
