const createProfessionsStore = (database) => {
    const professionsStore = database.createObjectStore("Profession", { keyPath: "profession_id"});
    professionsStore.createIndex("contact_id", "contact_id", { unique: false });
    professionsStore.createIndex("title", "title", { unique: true });
}

export {
    createProfessionsStore
}