
// const contacts = require('./contacts');

const { argv } = require('process');
const { question, saveContact, listContact, detailContact, deleteContact } = require('./contacts');
const yargs = require('yargs');

/*
yargs.command(
  'add',
  'Add new contact',
  () => {},
  (argv) => {
    console.log(argv.name);
  }
);
*/

// node app.js add --name="John Doe" --phone="08123456789" --email="john@doe.com"

yargs.command({
  command: 'add',
  describe: 'Add new contact',
  builder: {
    name: {
      describe: 'Contact name',
      demandOption: true,
      type: 'string'
    },
    phone: {
      describe: 'Contact phone number',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Contact email',
      demandOption: false,
      type: 'string'
    }
  },
  handler(argv) {
    saveContact(argv.name, argv.phone, argv.email);
  }
}).demandCommand();

// Show contacts
yargs.command({
  command: 'list',
  describe: 'List all contacts',
  handler() {
    listContact();
  }
});

// Show contact detail
yargs.command({
  command: 'detail',
  describe: 'Show contact detail by name',
  builder: {
    name: {
      describe: 'Contact name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    console.log('Show contact detail for', argv.name);
    detailContact(argv.name);
  }
});

// Remove contact
yargs.command({
  command: 'remove',
  describe: 'Remove contact by name',
  builder: {
    name: {
      describe: 'Contact name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    console.log('Remove contact', argv.name);
    deleteContact(argv.name);
  }
});

yargs.parse();

// const main = async () => {
//   const name = await question('What is your name? ');
//   const phone = await question('What is your phone number? ');

//   saveContact(name, phone);
// }

// main();
