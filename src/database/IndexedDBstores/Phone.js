const createPhonesStore = (database) => {
    const phonesStore = database.createObjectStore("Phone", { keyPath: "phone_id"});
    phonesStore.createIndex("contact_id", "contact_id", { unique: false });
    phonesStore.createIndex("number", "number", { unique: true });
}

export {
    createPhonesStore
}