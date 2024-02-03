const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Readline
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const filePath = './data/contact.json';
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// const question = (question) => {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (name) => {
//       resolve(name);
//     });
//   });
// };

const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
};

const saveContact = (name, phone, email) => {
    const contact = {name, phone, email};
    // const file = fs.readFileSync('data/contact.json', 'utf8');
    // const contacts = JSON.parse(file);

    const contacts = loadContact();

    // Check if the contact already exists
    const duplicate = contacts.find(contact => contact.name === name);
    if (duplicate) {
      console.log(chalk.red.inverse.bold('Email already exists'));
    //   rl.close();
      return;
    }

    // Check if the email is valid
    if (email) {
      if (!validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold('Invalid email'));
        // rl.close();
        return;
      }
    }

    // Check if the phone number is valid
    if (!validator.isMobilePhone(phone, 'id-ID')) {
      console.log(chalk.red.inverse.bold('Invalid phone number'));
    //   rl.close();
      return;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts, null, 2));

    // console.log('Contact saved successfully');
    console.log(chalk.green.inverse.bold('Contact saved successfully'));

    // rl.close();
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold('Your contacts'));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone} - ${contact.email}`);
  });
};

const detailContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (!contact) {
      console.log(chalk.red.inverse.bold('Contact not found'));
      return;
    }
    console.log(chalk.cyan.inverse.bold('Contact detail'));
    console.log(contact.name);
    console.log(contact.phone);
    if (contact.email) {
      console.log(contact.email);
    }
};

const deleteContact = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(contact => contact.name.toLowerCase() !== name.toLowerCase());
    if (contacts.length === newContacts.length) {
      console.log(chalk.red.inverse.bold('Contact not found'));
      return;
    }
    fs.writeFileSync('data/contact.json', JSON.stringify(newContacts, null, 2));
    console.log(chalk.green.inverse.bold('Contact deleted successfully'));
}

// module.exports = { question, saveContact, listContact };
module.exports = { saveContact, listContact, detailContact, deleteContact };

// const question2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('What is your phone number? ', (phone) => {
//       resolve(phone);
//     });
//   });
// }