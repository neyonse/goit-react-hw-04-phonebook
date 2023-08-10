import css from './Filter.module.css';
import { LuSearch } from 'react-icons/lu';
import PropTypes from 'prop-types';

export function Filter({ value, onFilterChange }) {
  const handleChange = e => {
    const { value } = e.currentTarget;

    onFilterChange(value);
  };

  return (
    <div className={css.filter}>
      <i className={css.searchIcon} aria-hidden="true">
        <LuSearch />
      </i>
      <input
        className={css.input}
        id="search"
        type="search"
        placeholder="Search by name"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
