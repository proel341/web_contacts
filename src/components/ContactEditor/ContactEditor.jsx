import { useState } from "react";
import { useContacts } from "../../database/databaseProvider";
import { useEffect } from "react";

import "./ContactEditor.css"

const ContactEditor = (contact) => {
    console.log("INIT EDITOR: ", contact);
    const test = useContacts();

    const [name, setName] = useState(contact?.name ? contact.name : "");
    const [surname, setSurname] = useState(contact?.surname ? contact.surname : "");
    const [patronymic, setPatronymic] = useState(contact?.patronymic ? contact.patronymic : "");
    const [phones, setPhones] = useState(contact?.phones ? contact.phones : []);
    const [mails, setMails] = useState(contact?.mails ? contact.mails : []);
    const [professions, setProfessions] = useState(contact?.professions ? contact.professions : []);
    const [jobs, setJobs] = useState(contact?.jobs ? contact.jobs : []);

    return <div className="contact-editor">
        <form action="">
            <label htmlFor="name">
                Name:
                <input type="text" name="name" id="name"
                    value={name} onChange={inputNameListener}/>
            </label>

            <label>
                Surname:
                <input type="text" name="surname" id="surname"
                    value={surname} onChange={inputSurnameListener}/>
            </label>
            
            <label>
                Patronymic:
                <input type="text" name="patronymic" id="patronymic"
                    value={patronymic} onChange={inputPatronymicListener}/>
            </label>

            <label>
                Phones:
                {phones.map(phone => <span key={phone.id}>{phone.number}</span>)}
                <button onClick={newPhoneClickListener}>New</button>
            </label>

            <label>
                Mails:
                <button>New</button>
            </label>

            <label>
                Professions:
                <button>New</button>
            </label>

            <label>
                Jobs:
                <button>New</button>
            </label>

            {contact ? <span>
                <button>Ok</button>
                <button>Cancel</button>
            </span>
                : <span>
                    <button>Create</button>
                </span>}
        </form> 
    </div>

// === event listeners =======================================================
    function newPhoneClickListener(event){
        console.log(test.add({name: "a", surname: "b", patronymic: "c"}));
        event.preventDefault();
    }

    function inputNameListener(event) { setName(event.target.value) }
    function inputSurnameListener(event) { setSurname(event.target.value) }
    function inputPatronymicListener(event) { setPatronymic(event.target.value) }
}

export default ContactEditor;

function isContact_DuckTyping(contact){
    const classof = ({}).toString;

    return typeof contact === "object" && 
        (typeof contact.name === "string") ||
        (typeof contact.surname === "string") ||
        (typeof contact.patronymic === "string") ||
        (typeof classof.call(contact.phones) === "[object Array]") ||
        (typeof classof.call(contact.mails) === "[object Array]") ||
        (typeof classof.call(contact.professions) === "[object Array]") ||
        (typeof classof.call(contact.jobs) === "[object Array]")
}