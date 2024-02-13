import { useState } from "react";
import { useContacts } from "../../database/databaseProvider";
import { useEffect } from "react";

import "./ContactEditor.css"

const ContactEditor = (props) => {
    const contactsStore = useContacts();
    if (!props.contact) props = {contact: {
        name: "Name",
        surname: "Surname",
        patronymic: "Patronymic",
        phones: [{id: 0, number: "+79999999999"}],
        mails: [{id: 0, mail: "mail@mail.mail"}],
        professions: [{id: 0, title: "Professon 1"}],
        jobs: [{id: 0, title: "The best job"}]}
    };
    const contact = props.contact;

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phones, setPhones] = useState([]);
    const [mails, setMails] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (isContact_DuckTyping(contact)) {
            setName        (contact.name        ?? "");
            setSurname     (contact.surname     ?? "");
            setPatronymic  (contact.patronymic  ?? "");
            setPhones      (contact.phones      ?? []);
            setMails       (contact.mails       ?? []);
            setProfessions (contact.professions ?? []);
            setJobs        (contact.jobs        ?? []);
        }
        console.log(contact);
    }, []);

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
                {mails.map(mail => <span key={mail.id}>{mail.mail}</span>)}
                <button>New</button>
            </label>

            <label>
                Professions:
                {professions.map(profession => <span key={profession.id}>{profession.title}</span>)}
                <button>New</button>
            </label>

            <label>
                Jobs:
                {jobs.map(job => <span key={job.id}>{job.title}</span>)}
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
        console.log(contactsStore.add({name: "a", surname: "b", patronymic: "c"}));
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
        (classof.call(contact.phones) === "[object Array]") ||
        (classof.call(contact.mails) === "[object Array]") ||
        (classof.call(contact.professions) === "[object Array]") ||
        (classof.call(contact.jobs) === "[object Array]")
}