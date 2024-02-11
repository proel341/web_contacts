const createMailsStore = (database) => {
    const mailsStore = database.createObjectStore("Mail", { keyPath: "mail_id"});
    mailsStore.createIndex("contact_id", "contact_id", { unique: false });
    mailsStore.createIndex("address", "address", { unique: true });
}

export {
    createMailsStore
}