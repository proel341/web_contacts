import { createContext, useContext, useReducer} from "react";

import { createContactsStore } from "./IndexedDBstores/Contact";
import { createPhonesStore } from "./IndexedDBstores/Phone";
import { createMailsStore } from "./IndexedDBstores/Mail";
import { createProfessionsStore } from "./IndexedDBstores/Profession";
import { createJobsStore } from "./IndexedDBstores/Job";

import { createDatabase, openConnection, dbfetch } from "./indexedDB";
import { useEffect } from "react";

const dbOpenConnect = () => createDatabase("Contacts", 1, (event) => {
    const database = event.target.result;
    createContactsStore(database);
    createPhonesStore(database);
    createMailsStore(database); 
    createProfessionsStore(database);
    createJobsStore(database);
}).then(db => openConnection(db, "Contact"), console.log);
    
const contactsContext = createContext(null);

const phonesContext = createContext(null);
const mailsContext = createContext(null);
const professionsContext = createContext(null);
const jobsContext = createContext(null);

const reducer = (state, action) => action(state);

const Repository = ({children}) => {
    const [contacts, dispatchContacts] = useReducer(reducer, []); 
    const [phones, dispatchPhones] = useReducer(reducer, []);
    const [mails, dispatchMails] = useReducer(reducer, []);
    const [professons, dispatchProfessions] = useReducer(reducer, []);
    const [jobs, dispatchJobs] = useReducer(reducer, []);

    useEffect(() => {
        dbOpenConnect()
            .then(tx => dbfetch(tx, {method: "getAll"}))
            .then(objects => dispatchContacts(() => objects))
    }, []);

    const constactStoreDriver = {
        contacts,
        add: async (contact) => await dbOpenConnect()
            .then(tx => dbfetch(tx, {method: "add", props: contact}))
            .then(id => {
                dispatchContacts(state => [...state])
                return Promise.resolve(id);
            }), 
    }

    return <contactsContext.Provider value={constactStoreDriver}>
        <phonesContext.Provider value={1}>
            <mailsContext.Provider value={1}>
                <professionsContext.Provider value={1}>
                    <jobsContext.Provider value={1}>
                        {children}
                    </jobsContext.Provider>
                </professionsContext.Provider>
            </mailsContext.Provider>
        </phonesContext.Provider>
    </contactsContext.Provider>
}

const repository = {
    contacts: [
        {
            id: 0,
            name: "proel341",
            surname: "surname",
            patronymic: "patronymic",
            phones: [
                {
                    id: 0,
                    phone: "+99999999999"
                }
            ],
            mails: [
                {
                    id: 0,
                    mail: "mail.mail",
                }
            ],
            professions: [
                {
                    id: 0,
                    profession: "software developer"
                }
            ],
            jobs: [
                {
                    id: 0,
                    job: "MY BEST JOB"

                }
            ]
        },
        {
            id: 1,
            name: "Proel's friend"
        },
    ]
}

const databaseContext = createContext(null);
const dispatchDatabaseContext = createContext(null);

const DatabaseProvider = ({children}) => {
    const [db, dispatchdb] = useReducer(reducer, repository)

    const databaseDriver = {
        Contact: {
            changeName: (id, name) => dispatchdb(() => ({
                    ...db, 
                    contacts: [
                        ...db.contacts.filter(contact => contact.id != id), 
                        {...db.contacts[id], name}
                    ].sort((c1, c2) => c1.id - c2.id)
                })
            ),
        } 
    };

    return <databaseContext.Provider value={db}>
        <dispatchDatabaseContext.Provider value = {databaseDriver}>
            {children}
        </dispatchDatabaseContext.Provider>
    </databaseContext.Provider>
}

const useDatabase = () => useContext(databaseContext);
const useDispatchDatabase = () => useContext(dispatchDatabaseContext);


const useContacts = () => useContext(contactsContext);


export default Repository;

export {
    //DatabaseProvider,
    useDatabase,
    useDispatchDatabase,

    Repository as DatabaseProvider,
    useContacts
};