import { createTable } from "../IndexedDatabase/idb";

const VERSION = 1;
export const contacts = createTable(VERSION)((database) => {
    const contacts = database.createObjectStore("Contact", { keyPath: "id", autoIncrement: true });
    contacts.createIndex("fname", "fname", { unique: false });
    contacts.createIndex("sname", "sname", { unique: false });
    contacts.createIndex("pname", "pname", { unique: false });
    contacts.createIndex("phone", "phone", { unique: false });
    contacts.createIndex("mail",  "mail",  { unique: false });
    contacts.createIndex("job",   "job",   { unique: false });

})