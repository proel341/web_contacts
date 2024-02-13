const createDatabase = (name, version, versionbuild) => {
    const request = window.indexedDB.open(name, version);
    request.onupgradeneeded = versionbuild;
    return new Promise((resolve, reject) => {
        request.onerror = (event) => reject(event.target.result);
        request.onsuccess = (event) => resolve(event.target.result);
    });
}

const openConnection = (database, storename, mode="readwrite") => {
    const transaction = database.transaction([storename], mode);
        transaction.onerror = (event) => console.lob(event.target.result);
        transaction.oncomplete = () => console.log("Complete"); 
        const request = transaction.objectStore(storename);
        return request;
}

const dbfetch = (request, {method, props}) => {
    return new Promise((resolve, reject) => {
        const req = request[method](props);
        req.onerror = (event) => reject(event.target.result);
        req.onsuccess = (event) => resolve(event.target.result);
    });
}

export {
    createDatabase,
    openConnection,
    dbfetch
}