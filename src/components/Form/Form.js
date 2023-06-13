import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './Form.module.css';

export default function Form({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmitForm(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          className={css.formInput}
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={numberInputId}>Number</label>
        <input
          className={css.formInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          id={numberInputId}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}
