import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState([
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [firstRender, setFistRender] = useState(true);

  useEffect(() => {
    const contactsInLocalStorageGet = 'contacts';
    const getContacts = localStorage.getItem(contactsInLocalStorageGet);
    const parsedContacts = JSON.parse(getContacts);
    setContacts(() => parsedContacts);
    setFistRender(false);
  }, []);

  useEffect(() => {
    const contactsInLocalStorageSet = 'contacts';
    if (!firstRender) {
      localStorage.setItem(contactsInLocalStorageSet, JSON.stringify(contacts));
    }
  }, [contacts, firstRender]);

  const handleNameMatch = (name, number) => {
    const normalizedFind = name.toLocaleLowerCase();
    return contacts.find(
      contact => contact.name.toLocaleLowerCase() === normalizedFind
    )
      ? Notiflix.Notify.warning(`${name} is already in contacts!`)
      : formSubmitHandler(name, number);
  };

  const formSubmitHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmitForm={handleNameMatch} />
      <h2>Contacts</h2>
      <Filter valueFilter={filter} onChange={changeFilter} />
      <Contacts
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
