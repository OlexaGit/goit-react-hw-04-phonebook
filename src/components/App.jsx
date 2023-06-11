import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  // const searchInputId = nanoid();

  // useEffect(() => {
  //   const contactsInLocalStorageGet = 'contacts';
  //   const contacts = localStorage.getItem(contactsInLocalStorageGet);
  //   const parsedContacts = JSON.parse(contacts);
  //   console.log(contacts);
  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //   }
  // }, []);
  // // console.log(state.contacts);
  // useEffect(() => {
  //   const contactsInLocalStorageSet = 'contacts';
  //   localStorage.setItem(
  //     contactsInLocalStorageSet,
  //     JSON.stringify(state.contacts)
  //   );
  // });

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
    setContacts(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
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
    console.log(contactId);
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

// ****
// export class App extends Component {
//   state = {
//     contacts: [
//       // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   searchInputId = nanoid();

//   componentDidMount() {
//     const contactsInLocalStorageGet = 'contacts';
//     const contacts = localStorage.getItem(contactsInLocalStorageGet);
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     const contactsInLocalStorageSet = 'contacts';
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem(
//         contactsInLocalStorageSet,
//         JSON.stringify(this.state.contacts)
//       );
//     }
//   }

//   handleNameMatch = ({ name, number }) => {
//     const { contacts } = this.state;
//     const normalizedFind = name.toLocaleLowerCase();
//     return contacts.find(
//       contact => contact.name.toLocaleLowerCase() === normalizedFind
//     )
//       ? Notiflix.Notify.warning(`${name} is already in contacts!`)
//       : this.formSubmitHandler(name, number);
//   };

//   formSubmitHandler = (name, number) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLocaleLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const getVisibleContacts = this.getVisibleContacts();

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <Form onSubmitForm={this.handleNameMatch} />
//         <h2>Contacts</h2>
//         <Filter valueFilter={filter} onChange={this.changeFilter} />
//         <Contacts
//           contacts={getVisibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
App.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.arrayOf(PropTypes.string.isRequired),
    filter: PropTypes.string.isRequired,
  }),
  contactsInLocalStorage: PropTypes.arrayOf(),
};
