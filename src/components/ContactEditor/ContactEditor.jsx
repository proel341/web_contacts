import { useState } from "react"

const ContactEditor = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phones, setPhones] = useState([{id: 1, number: "+79233577718"}]);
    const [mails, setMails] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [jobs, setJobs] = useState([]);

    return <div>
        <form action="">
            <label htmlFor="name">
                Name
                <input type="text" name="name" id="name"
                    value={name} onChange={inputNameListener}/>
            </label>

            <label>
                Surname
                <input type="text" name="surname" id="surname"
                    value={surname} onChange={inputSurnameListener}/>
            </label>
            
            <label>
                Patronymic
                <input type="text" name="patronymic" id="patronymic"
                    value={patronymic} onChange={inputPatronymicListener}/>
            </label>

            <label>
                Phones:
                {phones.map(phone => <span key={phone.id}>{phone.number}</span>)}
                <button>New</button>
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
        </form> 
    </div>

// === event listeners =======================================================
    function inputNameListener(event) { setName(event.target.value) }
    function inputSurnameListener(event) { setSurname(event.target.value) }
    function inputPatronymicListener(event) { setPatronymic(event.target.value) }
}

export default ContactEditor;