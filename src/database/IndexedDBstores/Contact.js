const createContactsStore = (database) => {
    const contactsStore = database.createObjectStore("Contact", { keyPath: "contact_id", autoIncrement: true});
    contactsStore.createIndex("name", "name", { unique: false });
    contactsStore.createIndex("surname", "surname", { unique: false });
    contactsStore.createIndex("patronymic", "patronymic", { unique: false });
}

export {
    createContactsStore,
}