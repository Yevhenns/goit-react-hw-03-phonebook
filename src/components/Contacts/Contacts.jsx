import React from 'react';
import { ContactItem } from './ContactsItem/ContactsItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import css from './Contacts.module.css';

export const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.listItem} key={nanoid()}>
            <ContactItem
              id={id}
              name={name}
              number={number}
              deleteContact={deleteContact}
            />
          </li>
        );
      })}
    </ul>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};
