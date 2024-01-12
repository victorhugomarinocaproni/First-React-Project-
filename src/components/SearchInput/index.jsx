import P from 'prop-types';

import './styles.css';

export const SearchInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="search-input"
      value={searchValue}
      onChange={handleChange}
      type="search"
      placeholder="Type your search"
    />
  );
};

SearchInput.propTypes = {
  searchValue: P.string,
  handleChange: P.func.isRequired,
};
