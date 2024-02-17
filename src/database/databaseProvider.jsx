import { useState, createContext, useContext, useEffect } from "react";
import { createDatabase } from "../IndexedDatabase/idb";
import { contacts } from "./contacts_v1";

const idb = createDatabase("Contacts", 1, contacts);

const getAll = () => idb.then(idbfetch => idbfetch("Contact", {method: "getAll", props: null}));
const getById = (id) => idb.then(idbfetch => idbfetch("Contact", {method: "get", props: id}));
const put = (contact) => idb.then(idbfetch => idbfetch("Contact", {method: "put", props: contact}));
const deleteById = (id) => idb.then(idbfetch => idbfetch("Contact", {method: "delete", props: id}));

const context = createContext(null);

const IdbProvider = ({children}) => {
    const [repo, setRepo] = useState([])

    const Repository = {
        contacts: () => getAll().then(setRepo),
        get: (id, setter) => getById(id).then(setter),
        add: (contact) => {put(contact); getAll().then(setRepo)},
        delete: (id) => {deleteById(id); getAll().then(setRepo)},
        update: (id, contact) => {deleteById(id); put({id, ...contact}); getAll().then(setRepo)},
    }

    useEffect(() => {
        getAll().then(setRepo)
    }, []);
    
    return <context.Provider value={{list: repo, repo: Repository}}>
        {children}
    </context.Provider>
}

const useContacts = () => useContext(context);

export default IdbProvider;
export { useContacts };