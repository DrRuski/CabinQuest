import PropTypes from "prop-types";

Search.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  placeholderText: PropTypes.string,
};

export default function Search({ query, setQuery, placeholderText }) {
  return (
    <input
      className="ps-2 w-full h-10 rounded shadow-md outline-accent"
      type="text"
      placeholder={placeholderText}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
