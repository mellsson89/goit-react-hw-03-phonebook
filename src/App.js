import React,{Component} from "react";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Modal from "./components/Modal";

class App extends Component {


    state = {
        contacts: [ {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
        showModal:false,
        filter: '',

    }

    componentDidMount() {
        const contacts=localStorage.getItem('contacts');
        const parsedContacts=JSON.parse(contacts);
        if(parsedContacts) {
            this.setState({contacts:parsedContacts})
        }
    }

    componentDidUpdate(prevProps, prevState, ) {
        if(this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
        }

        // if (this.state.contacts.length > prevState.contacts.length && prevState.contacts.length >0) {
        //     this.toggleModal();
        //
        // }
    }

    handleFilter =(e) => {
        this.setState({
            filter:e.currentTarget.value
        })
    }

    addContact = (contact) => {
        const cloneName=this.state.contacts.find(({name}) => name === contact.name);
        if(cloneName) {
            const {name} =cloneName;
            alert(`${name} is already in contacts`);
            return;
        }

        this.setState(prevState => ({
           contacts:[contact,...prevState.contacts]
         }));
        this.toggleModal();
    }

    deleteContact =(id) => {
        this.setState(prevState => ({
            contacts:prevState.contacts.filter(contact => contact.id !== id)
        }))

    }

    toggleModal =() => {
        this.setState(({showModal} )=> ({
            showModal: !showModal,
        }))
    }



    render() {
        const {filter,showModal} =this.state;
        const normalizeFilter=filter.toLowerCase();
        const visibleFilter = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
        return (
            <div>
                <button type='button' onClick={this.toggleModal}>Add contact</button>
                <h1>Phonebook</h1>
                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.handleFilter}/>
                <ContactList contacts={visibleFilter} onDelete={this.deleteContact}/>
                {showModal && <Modal onClose={this.toggleModal}><ContactForm onSubmit ={this.addContact}/></Modal>}
            </div>
        )
    }
}

export default App;
