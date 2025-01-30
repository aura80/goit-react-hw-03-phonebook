import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './ContactForm.module.css';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    console.log('DidMount - Contacts from local storage: ', savedContacts);

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });  // to OBJ
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));  // to string JSON
    }
  }

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const lowerContactName = name.toLowerCase();

    if (
      contacts.some(contact => contact.name.toLowerCase() === lowerContactName)
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(ante => ({
        contacts: [...ante.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = id => {
    this.setState(ante => ({
      contacts: ante.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterLower = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLower)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;


/* onAddContact - function defined here in parent App to add a new contact */
// [...ante.contacts, newContact];  gives us a new array with all the contacts of prevState.contacts plus newContact
