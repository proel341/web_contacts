import { useState } from "react";
import IdbProvider from "./database/databaseProvider";
import ContactList from "./components/ContactList/ContactList";
import ContactEditor from "./components/ContactEditor/ContactEditor";


const url = window.location.pathname;
const router = {
}

const App = () => {
    const [id, setId] = useState()

    return <IdbProvider>{
        (id !== undefined) 
        ? <ContactEditor id={id} setId={setId}/> 
        : <ContactList createBtnListener={createBtnListener}/>}
    </IdbProvider>

    function createBtnListener(id){
        return (event) => {
            setId(id);
            event.preventDefault();
        }    
    }
}


export default App;