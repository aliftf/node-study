const fs = require('fs');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const filePath = './data/contact.json';
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
};

const findContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    return contact;
}

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
}

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

const updateContacts = (newContacts) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter(contact => contact.name !== newContacts.oldName);
  delete newContacts.oldName;
  filteredContacts.push(newContacts);
  saveContacts(filteredContacts);
}

const deleteContact = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(contact => contact.name !== name);
    saveContacts(newContacts);
}

const checkDuplicate = (name) => {
    const contacts = loadContact();
    return contacts.find(contact => contact.name === name);
}

module.exports = { loadContact, findContact, addContact, checkDuplicate, deleteContact, updateContacts };