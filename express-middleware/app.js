const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// using ejs
app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Built-in middleware
app.use(express.static("public"));


// Application level middleware
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

app.get("/", (req, res) => {
  const students = [
    { name: "John", age: 20 },
    { name: "Jane", age: 21 },
    { name: "Jim", age: 22 },
  ];
  res.render("index", { name: "John", title: "Home", students, layout: "layouts/main"});
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main", title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", {layout: "layouts/main", title: "Contact" });
});

app.get("/product/:id", (req, res) => {
  // example: /product/123

  if (req.query.name) {
    // example: /product/123?name=shoes
    res.send(`Product ID: ${req.params.id}, Name: ${req.query.name}`);
  }
});

app.get("/product/:id/category/:category_id", (req, res) => {
  // example: /product/123/category/456
  res.send(
    `Product ID: ${req.params.id}, Category ID: ${req.params.category_id}`
  );
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
