import ContactCard from "./UserCard/UserCard";

const Text = () => {
    const cl = (id, name) => {
        console.log(id, name);
        dbDriver.Contact.changeName(id, name);
        console.log(db);
    }

    return <>
        {db.contacts.map(contact => <div key={contact.id}>
            <ContactCard contact={contact}/>
            <button onClick={() => cl(contact.id, "default")}>Click me!</button>
        </div>)}
        
    </>
}

export default Text;