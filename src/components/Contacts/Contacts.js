import css from './Contacts.module.css';

const Contacts = ({ contacts, onDeleteContact }) => {
  return (
    <div className={css.form}>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={css.formList}>
            @ {name}: {number}
            <button
              className={css.formButton}
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
