import { useState, useEffect } from "react";
import { useContacts } from "../../database/databaseProvider";

import "./ContactEditor.css"

const a = "a";
const ContactEditor = ({ id = null, setId = () => null}) => {
    const repo = useContacts().repo;

    const [contact, setContact] = useState({});

    useEffect(() => {
        if (Number.isInteger(id))
            repo.get(id).then(setContact)
    }, []);

    return <div className="contact-editor">
        <label htmlFor="name">
            Name:
            <input type="text" defaultValue={contact.fname} onChange={inputEventListener("fname")}/>
        </label>

        <label>
            Surname:
            <input type="text" defaultValue={contact.sname} onChange={inputEventListener("sname")}/>
        </label>

        <label>
            Patronymic:
            <input type="text" defaultValue={contact.pname} onChange={inputEventListener("pname")}/>
        </label>

        <label>
            Phone:
            <input type="text" defaultValue={contact.phone} onChange={inputEventListener("phone")}/>
        </label>

        <label>
            Mail:
            <input type="text" defaultValue={contact.mail} onChange={inputEventListener("mail")}/>
        </label>

        <label>
            Job:
            <input type="text" defaultValue={contact.job} onChange={inputEventListener("job")}/>
        </label>

        <button onClick={addEventListener}>Add</button>
        <button onClick={cancelEventListener}>Cancel</button>
    </div>

    function addEventListener(event){
        if (id === null)
            repo.add(contact);
        else
            repo.update(id, contact);

        setId(undefined);
        event.preventDefault();
    }

    function cancelEventListener(event){
        setId(undefined);
        event.preventDefault();
    }

    function inputEventListener(field){
        return (event) => {
           setContact({...contact, [field]: event.target.value}) 
           event.preventDefault();
        }
    }
}

export default ContactEditor;