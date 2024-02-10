const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Set the method override
app.use(methodOverride("_method"));

// Set the view engine to ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// flash config
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Home route
app.get("/", (req, res) => {
  const students = [
    { name: "John", age: 20 },
    { name: "Jane", age: 21 },
    { name: "Jim", age: 22 },
  ];
  res.render("index", {
    name: "John",
    title: "Home",
    students,
    layout: "layouts/main",
  });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main", title: "About" });
});

// Contact route
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    layout: "layouts/main",
    title: "Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// Add contact route
app.get("/contact/add", (req, res) => {
  res.render("add-contact", { layout: "layouts/main", title: "Add Contact" });
});

// Add contact process route
app.post(
  "/contact",
  [
    body("name").custom(async (value) => {
      const duplicate = await Contact.findOne({ name: value });
      if (duplicate) {
        throw new Error("Name already exist");
      }
      return true;
    }),
    check("email", "Invalid Email").isEmail(),
    check("phone", "Invalid Phone Number").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.render("add-contact", {
        layout: "layouts/main",
        title: "Add Contact",
        errors: error.array(),
        data: req.body,
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        if (error) {
          req.flash("msg", "Failed to add contact");
        } else {
          req.flash("msg", "Contact successfully added");
        }
        res.redirect("/contact");
      });
    }
  }
);

// Delete contact route
/*
app.get("/contact/delete/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  if (!contact) {
    res.status(404);
    res.send("404");
  } else {
    await Contact.deleteOne({ _id : contact._id }).then((result) => {
      req.flash("msg", "Contact successfully deleted");
      res.redirect("/contact");
    });
  }
});
*/

// Delete contact route
app.delete("/contact", async (req, res) => {
  await Contact.deleteOne({ name: req.body.name }).then((result) => {
    req.flash("msg", "Contact successfully deleted");
    res.redirect("/contact");
  });
});

// Edit contact route
app.get("/contact/edit/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  if (!contact) {
    res.status(404);
    res.send("404");
  } else {
    res.render("edit-contact", {layout: "layouts/main", title: "Edit Contact", contact});
  }
});

// Update contact route
app.put("/contact", [
  body('name').custom( async (value, { req }) => {
    const duplicate = await Contact.findOne({ name: value });
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
    Contact.updateOne({ _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone
        }
      }
    ).then((result) => {
        req.flash("msg", "Contact successfully updated");
        res.redirect("/contact");
      });
  }
});

// Contact detail route
app.get("/contact/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render("contact-detail", {
    layout: "layouts/main",
    title: "Contact",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Server is running on port ${port}`);
});
