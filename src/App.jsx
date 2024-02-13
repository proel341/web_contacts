import { DatabaseProvider, useContacts } from "./database/databaseProvider";
import Text from "./components/text";
import ContactEditor from "./components/ContactEditor/ContactEditor";

const url = window.location.pathname;
const router = {
}

const App = () => {

    return <DatabaseProvider>
        <ContactEditor/>
    </DatabaseProvider>
    // return <DatabaseProvider>
    //     <h1>AA</h1>
    //    <Text/>
    //    <ContactEditor/>
    // </DatabaseProvider>;


}

export default App;