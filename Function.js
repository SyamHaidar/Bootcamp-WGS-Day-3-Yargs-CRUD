// file system
const fs = require("fs");
// validator
const validator = require("validator");

// ----------------------------------------------------------------

const dir = "./data"; // directory name
const file = "./data/contacts.json"; // file name, inside dir

// check directory and file before input
// if directory not exist, create directory
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// if file not exist, create file
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]");
}

// ----------------------------------------------------------------

// function load contact
const LoadContact = () => {
  // read file before write
  const file = fs.readFileSync("data/contacts.json", "utf8");

  // change data string to object
  const contacts = JSON.parse(file);

  return contacts;
};

// search contact
const Seacrh = (name) => {
  // load contact
  const contacts = LoadContact();

  // find detail contact by name
  const findName = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  return findName;
};

// filter contact
const Filter = (name) => {
  // load contact
  let contacts = LoadContact();

  // find contact by name
  const findName = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  // if name not exist return false
  if (!findName) {
    console.log("Contact not found!");
    return false;
  }

  // remove contact by name
  const filterContact = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  // write items to file after filter
  fs.writeFileSync("data/contacts.json", JSON.stringify(filterContact));

  return findName;
};

// function list contact
const ListContact = () => {
  // load contact
  const contacts = LoadContact();

  // show all contact list
  console.log("Contact List: ");
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.phone}`);
  });
};

// function detail contact
const DetailContact = (name) => {
  const seacrh = Seacrh(name);

  // if name exist show detail
  console.log("Contact Detail: ");
  console.log(
    `Name: ${seacrh.name} \nEmail: ${seacrh.email} \nPhone: ${seacrh.phone}`
  );
};

// function save data
const SaveData = (name, phone, email) => {
  // array object
  const contact = { name, phone, email };

  // load contact
  const contacts = LoadContact();

  // check duplicate name
  const duplicate = contacts.find((contact) => contact.name === name);

  // if name already exist return false
  if (duplicate) {
    console.log("Contact Name already recorded. Please use another name");
    return false;
  }

  // if email not valid then return false
  if (contact.email) {
    if (!validator.isEmail(contact.email)) {
      console.log("Please input correct email");
      return false;
    }
  }

  // if mobile not valid then return false
  if (!validator.isMobilePhone(contact.phone)) {
    console.log("Please input correct phone number");
    return false;
  }

  // if name available, email, and mobile correct then save data
  // add items to variable contact
  contacts.push(contact);

  // change data object to sting and write items to file
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  // send respond when input success
  console.log(
    `Thank you for input your data! \nYour name is ${name}, your mobile phone is ${phone}, and your email is ${email}`
  );
};

// function delete contact
const DeleteContact = (name) => {
  const filter = Filter(name);

  console.log(`${filter.name} deleted from contact`);
};

// function update contact
const UpdateContact = (name, newName, phone, email) => {
  // array object
  const contact = { name, phone, email };

  // filter contact
  const filter = Filter(name);

  // if name update change current name to new name
  if (newName) {
    contact.name = newName;
  }

  // if phone not update use current phone
  if (!contact.phone) {
    contact.phone = filter.phone;
  } else {
    if (!validator.isMobilePhone(contact.phone)) {
      console.log("Please input correct phone number");
      return false;
    }
  }

  // if email not update use current email
  if (!contact.email) {
    contact.email = filter.email;
  } else {
    if (!validator.isEmail(contact.email)) {
      console.log("Please input correct email");
      return false;
    }
  }

  // create new array
  let newContact = LoadContact();

  // add items to new contact
  newContact.push(contact);

  // change data object to sting and write items to file
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));

  // show detail contact
  DetailContact(!newName ? name : newName);
};

module.exports = {
  DetailContact,
  SaveData,
  ListContact,
  UpdateContact,
  DeleteContact,
};
