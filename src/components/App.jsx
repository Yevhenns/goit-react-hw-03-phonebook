import React, { Component } from 'react';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contactsData = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsData);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  formSubmitHandler = contactData => {
    const array = this.state.contacts.map(contact => contact.name);
    const newContact = { ...contactData, id: nanoid() };
    !array.includes(contactData.name)
      ? this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
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
      <div className={css.container}>
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
