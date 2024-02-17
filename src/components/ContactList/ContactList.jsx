import { useContacts } from "../../database/databaseProvider"

import ContactCard from "../ContactCard/ContactCard";

import "./ContactList.css"

const ContactList = ({ createBtnListener = e => e.preventDefault()}) => {
    const contacts = useContacts().list;
    const repo = useContacts().repo;

    console.log("Mount ContactList", contacts)
    
    return <div className="contactsList">
        {contacts.map(contact => <ContactCard 
            key={contact.id} 
            contact={contact}
            editListener={createBtnListener(contact.id)}
            deleteListener={(e) => {repo.delete(contact.id); e.preventDefault()}}
        />)}
        <button className="add-btn" onClick={createBtnListener(null)}></button>
    </div>

}

export default ContactList;