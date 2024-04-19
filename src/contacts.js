const fs = require('node:fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

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
    const contact = await getContactById(contactId);
    const result = data.filter(contact => contact.id !== contactId);

    await fs.writeFile(contactsPath, result)

    return  contact ? contact : null;
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