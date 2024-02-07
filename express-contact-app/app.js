const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const { loadContact, findContact, addContact, checkDuplicate, deleteContact, updateContacts } = require("./utils/contacts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// using ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// flash config
app.use(cookieParser("secret"));
app.use(session({
  cookie: { maxAge: 6000 },
  secret: "secret",
  resave: true,
  saveUninitialized: true
})
);

app.use(flash());

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
  const contacts = loadContact();

  res.render("contact", {layout: "layouts/main", title: "Contact", contacts, msg: req.flash("msg")});
});

app.post("/contact", [
  body('name').custom((value) => {
    const duplicate = checkDuplicate(value);
    if (duplicate) {
      throw new Error('Name already exist');
    }
    return true;
  }),
  check('email', 'Invalid Email').isEmail(),
  check('phone', 'Invalid Phone Number').isMobilePhone('id-ID')
  ], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    // return res.status(400).json({ error: error.array() });
    res.render("add-contact", {layout: "layouts/main", title: "Add Contact", errors: error.array(), data: req.body});
  } else {
    addContact(req.body);
    req.flash("msg", "Contact successfully added");
    res.redirect("/contact");
  }
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {layout: "layouts/main", title: "Add Contact"});
});

app.get("/contact/delete/:name", (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) {
    res.status(404);
    res.send("404");
  } else {
    deleteContact(req.params.name);
    req.flash("msg", "Contact successfully deleted");
    res.redirect("/contact");
  }
});

app.get("/contact/edit/:name", (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) {
    res.status(404);
    res.send("404");
  } else {
    res.render("edit-contact", {layout: "layouts/main", title: "Edit Contact", contact});
  }
});

app.post("/contact/update", [
  body('name').custom((value, { req }) => {
    const duplicate = checkDuplicate(value);
    if (value !== req.body.oldName && duplicate) {
      throw new Error('Name already exist');
    }
    return true;
  }),
  check('email', 'Invalid Email').isEmail(),
  check('phone', 'Invalid Phone Number').isMobilePhone('id-ID')
  ], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.render("edit-contact", {layout: "layouts/main", title: "Edit Contact", errors: error.array(), contact: req.body});
  } else {
    updateContacts(req.body);
    req.flash("msg", "Contact successfully updated");
    res.redirect("/contact");
  }
});

app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);

  res.render("contact-detail", {layout: "layouts/main", title: "Contact", contact });
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
