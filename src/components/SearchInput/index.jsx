import './styles.css';

export const SearchInput = ({searchValue, handleChange}) => {
    return (
        <input
            className='search-input'
            value={searchValue}
            onChange={handleChange}
            type="search"
            placeholder='Type your search'
        />
    );
};