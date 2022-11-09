import React, { Component } from 'react';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = contactData => {
    const array = this.state.contacts.map(contact => contact.name);
    const newContsct = { ...contactData, id: nanoid() };
    !array.includes(contactData.name)
      ? this.setState(({ contacts }) => ({
          contacts: [newContsct, ...contacts],
        }))
      : alert(`${contactData.name} is already in contacts.`);
  };

  filterHandler = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filteredNames = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterHandler} value={this.state.filter} />
        <Contacts
          contacts={this.filteredNames()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
