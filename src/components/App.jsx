import { Component } from 'react';
import { nanoid } from 'nanoid';
// import './App.css';

import PhoneList from './PhoneList';
import PhoneForm from './InputForm';
import Filter from './Filter';
import initialContacts from '../data/contacts.json';

class App extends Component {
  static defaultProps = {
    contacts: initialContacts,
    filter: '',
  };

  state = {
    contacts: this.props.contacts,
    filter: this.props.filter,
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts && this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    this.state.contacts.some(contact => name.toLowerCase() === contact.name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, { name, number, id: nanoid() }],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  findContactsByName = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filterContactList = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filteredContacts)
    );
  };

  render() {
    const { filter } = this.state;
    const { addContact, findContactsByName, filterContactList, deleteContact } =
      this;

    return (
      <div className="App">
        <h2 className="App-title">Phonebook</h2>
        <PhoneForm onAddContact={addContact} />
        <h2 className="App-title">Contacts</h2>
        <Filter contactName={filter} onFindContact={findContactsByName} />
        <PhoneList
          contacts={filterContactList()}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default App;
