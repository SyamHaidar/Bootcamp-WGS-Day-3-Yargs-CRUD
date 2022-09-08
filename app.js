const yargs = require("yargs");
const {
  ListContact,
  SaveData,
  DetailContact,
  UpdateContact,
  DeleteContact,
} = require("./Function");
// save data

// ---------------------------------------------------------

yargs.command({
  command: "list",
  describe: "see contact list",
  handler() {
    ListContact();
  },
});

// CRUD
// create
yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      decribe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    email: {
      decribe: "contact email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      decribe: "contact mobile phone number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    SaveData(argv.name, argv.mobile, argv.email);
  },
});

// read
yargs.command({
  command: "detail",
  describe: "see detail contact",
  builder: {
    name: {
      decribe: "Contact Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    DetailContact(argv.name);
  },
});

// update
yargs.command({
  command: "update",
  describe: "update contact",
  builder: {
    name: {
      decribe: "Contact Old Name",
      demandOption: true,
      type: "string",
    },
    newName: {
      decribe: "Contact New Name",
      demandOption: false,
      type: "string",
    },
    email: {
      decribe: "contact email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      decribe: "contact mobile phone number",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    UpdateContact(argv.name, argv.newName, argv.mobile, argv.email);
  },
});

// delete
yargs.command({
  command: "delete",
  describe: "delete contact",
  builder: {
    name: {
      decribe: "Contact Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    DeleteContact(argv.name);
  },
});

yargs.parse();
