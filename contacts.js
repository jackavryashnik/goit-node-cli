const fs = require('node:fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  }
  
  async function getContactById(contactId) {
    const data = await listContacts();
    const contact = data.find(contact => contact.id === contactId);
    
    return contact || null;
}
  
  async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex(item => item.id === contactId);

    if(index === -1) return null;
    
    const [result] = data.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

    return  result;
  }
  
  async function addContact(name, email, phone) {
    const newContact = {id: nanoid(), name, email, phone};
    const allContacts = await listContacts();

    allContacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return newContact;
  }
  

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}