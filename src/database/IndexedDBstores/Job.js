const createJobsStore = (database) => {
    const jobsStore = database.createObjectStore("Job", { keyPath: "job_id"});
    jobsStore.createIndex("contact_id", "contact_id", { unique: false });
    jobsStore.createIndex("title", "title", { unique: true });
}

export {
    createJobsStore
}