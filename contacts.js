const path = require('path');
const fs = require('fs').promises;

const shortid = require('shortid');

const contactsPath = path.join('./db/contacts.json');

const listContacts = async () => {
  try {
    const bufferData = await fs.readFile(contactsPath);

    const contacts = JSON.parse(bufferData);
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactByID = async contactID => {
  try {
    const bufferData = await fs.readFile(contactsPath);

    const contact = JSON.parse(bufferData).find(
      item => item.id === String(contactID)
    );

    console.table(contact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactID => {
  try {
    const bufferData = await fs.readFile(contactsPath);

    const contactsNew = JSON.parse(bufferData).filter(
      item => item.id !== String(contactID)
    );

    await fs.writeFile(contactsPath, JSON.stringify(contactsNew));

    console.table(contactsNew);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async contact => {
  try {
    const contactNew = { id: shortid.generate(), ...contact };

    const bufferData = await fs.readFile(contactsPath);

    const contactsNew = [contactNew, ...JSON.parse(bufferData)];

    await fs.writeFile(contactsPath, JSON.stringify(contactsNew));

    console.table(contactsNew);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { listContacts, getContactByID, removeContact, addContact };
