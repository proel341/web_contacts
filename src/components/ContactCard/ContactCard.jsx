import "./ContactCard.css"

const ContactCard = ({
    contact={}, 
    deleteListener=(e) => e.preventDefault(),
    editListener=(e) => e.preventDefault()
}) => {

    return <div className="contact">
        <span className="name">{contact.sname} {contact.fname} {contact.pname}</span>
        <span className="phone">{contact.phone}</span>
        <span className="mail">{contact.mail}</span>
        <span className="job">{contact.job}</span>
        <button className="edit-btn" onClick={editListener}></button>
        <button className="delete-btn" onClick={deleteListener}></button>
    </div>
}

export default ContactCard;