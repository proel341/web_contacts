export const createDatabase = (name, version, versionbuild) => {
    const request = window.indexedDB.open(name, version);
    request.onupgradeneeded = versionbuild(version);
    return new Promise((resolve, reject) => {
        request.onerror = (event) => reject(event.target.result);
        request.onsuccess = (event) => resolve(event.target.result);
    });
}

export const createTable = version_config =>
    configuration => 
        version_current => 
            version_current === version_in_db ? () => null : configuration;