import { useState, createContext, useContext } from "react";
import { createDatabase } from "../IndexedDataBase/idb";
import { contacts } from "./contacts_v1";

const idbfetch = createDatabase("Contacts", 1, contacts);

const IdbProvider = ({childrens}) => {
    const [contactData, UpdateContacts] = useState(null);

    const contactStore = createContext(null);
    const updateContactStore = createContext(null);

    return <contactStore.Provider value={contactData}>
        <updateContactStore.Provider value={UpdateContacts}>
            {childrens}
        </updateContactStore.Provider>
    </contactStore.Provider>
}

export default IdbProvider;

function _log(x){
    console.log(x);
    return x;
}