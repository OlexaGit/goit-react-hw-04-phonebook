import css from './Filtr.module.css';

const Filter = ({ valueFilter, onChange, searchInputId }) => {
  return (
    <div className={css.form}>
      <label htmlFor={searchInputId}>Find contacts by name</label>
      <input
        className={css.formInput}
        type="text"
        name="filter"
        value={valueFilter}
        onChange={onChange}
        id={searchInputId}
      />
    </div>
  );
};
export default Filter;
