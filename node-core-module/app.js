const fs = require('fs');

// write string to file (synchronous)
// fs.writeFileSync('helloSync.txt', 'Hello from Node.js With Synchronous'); // creates file if not exists or overwrites if exists

// write string to file (asynchronous)
// fs.writeFile('helloAsync.txt', 'Hello from Node.js With Asynchronous', (err) => {
//   if (err) throw err;
//   console.log('File written successfully');
// });

// read file (synchronous)
// const data = fs.readFileSync('helloSync.txt', 'utf8');
// console.log(data);

// read file (asynchronous)
// fs.readFile('helloAsync.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (name) => {
    rl.question('How old are you? ', (age) => {
        const contact = {name, age};
        const file = fs.readFileSync('contact.json', 'utf8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('contact.json', JSON.stringify(contacts, null, 2));
        console.log('Contact saved successfully');

        rl.close();
    });
});
