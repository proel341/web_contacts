import "./UserCard.css"

const ContactCard = (props) => {
    const contact = props.contact;
        
    return (Number.isInteger(contact.id)) && <div>
        <span className={"contact-title"}>
            <span>{contact.name ?? contact.name}</span>
            <span>{contact.surname ?? contact.surname}</span>
            <span>{contact.patronymic ?? contact.patronymic}</span>
        </span>

        {(contact.phones) && <span className={"contact-phones"}>
            {contact.phones.map(phone => <span key={phone.id}>{phone.phone}</span>)} 
        </span>}
        
        {(contact.mails) && <span className={"contact-mails"}>
            {contact.mails.map(mail => <span key={mail.id}>{mail.mail}</span>)}
        </span>}

        {(contact.professions) && <span className={"contact-professions"}>
            {contact.professions.map(profession => <span key={profession.id}>{profession.profession}</span>)}
        </span>}

        {(contact.jobs) && <span className={"contact-jobs"}>
            {contact.jobs.map(job => <span key={job.id}>{job.job}</span>)}
        </span>}
    </div>
    
}

export default ContactCard;