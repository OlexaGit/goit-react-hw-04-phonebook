import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <label htmlFor={this.nameInputId}>Name</label>
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            id={this.nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor={this.numberInputId}>Number</label>
          <input
            className={css.formInput}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            id={this.numberInputId}
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
}

export default Form;
