export const createDatabase = (name, version, versionbuild) => {
    const request = window.indexedDB.open(name, version);
    request.onupgradeneeded = (event) => {
        const database = event.target.result;
        versionbuild(database)(version);
    };
    return new Promise((resolve, reject) => {
        request.onerror = (event) => reject(event.target.result);
        request.onsuccess = (event) => resolve(event.target.result);
    }).then(database => (storename, {method, props}) => {
        return new Promise((resolve, reject) => {
            const tx = database.transaction([storename], "readwrite");
            tx.onerror = (event) => reject(event.target);
            //tx.oncomplete = (event) => console.log("Complete", event.target);
            tx.objectStore(storename)[method](props)
                .onsuccess = (event) => resolve(event.target.result);
        });
    });
}

export const createTable = version_config =>
    configuration => 
    database => 
    version_current => version_current !== version_config 
        ? () => null 
        : configuration(database);