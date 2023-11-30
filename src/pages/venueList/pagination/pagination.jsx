import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

Pagination.propTypes = {
  offset: PropTypes.number,
  setOffset: PropTypes.func,
};

export default function Pagination({ offset, setOffset }) {
  return (
    <ul className="flex items-center justify-between lg:gap-3 bg-buttonText py-1">
      <li className="w-10 h-10 shadow-md rounded hover:bg-accent hover:text-buttonText">
        <button
          className="flex items-center justify-center w-full h-full"
          onClick={() => setOffset((prev) => prev - 20)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </li>
      <li
        className={`w-10 h-10 rounded ${
          offset === 0
            ? "bg-accent text-buttonText shadow-inner"
            : "shadow-md text-text hover:bg-accent hover:text-buttonText"
        }`}
      >
        <button
          className="flex items-center justify-center w-full h-full"
          onClick={() => setOffset(0)}
        >
          <span>1</span>
        </button>
      </li>
      <li
        className={`w-10 h-10 rounded ${
          offset === 20
            ? "bg-accent text-buttonText shadow-inner"
            : "shadow-md text-text hover:bg-accent hover:text-buttonText"
        }`}
      >
        <button
          className="flex items-center justify-center w-full h-full "
          onClick={() => setOffset(20)}
        >
          <span>2</span>
        </button>
      </li>
      <li
        className={`w-10 h-10 rounded ${
          offset === 40
            ? "bg-accent text-buttonText shadow-inner"
            : "shadow-md text-text hover:bg-accent hover:text-buttonText"
        }`}
      >
        <button
          className="flex items-center justify-center w-full h-full "
          onClick={() => setOffset(40)}
        >
          <span>3</span>
        </button>
      </li>
      <li
        className={`w-10 h-10 rounded ${
          offset === 60
            ? "bg-accent text-buttonText shadow-inner"
            : "shadow-md text-text hover:bg-accent hover:text-buttonText"
        }`}
      >
        <button
          className="flex items-center justify-center w-full h-full "
          onClick={() => setOffset(60)}
        >
          <span>4</span>
        </button>
      </li>
      <li
        className={`w-10 h-10 rounded ${
          offset === 80
            ? "bg-accent text-buttonText shadow-inner"
            : "shadow-md text-text hover:bg-accent hover:text-buttonText"
        }`}
      >
        <button
          className="flex items-center justify-center w-full h-full "
          onClick={() => setOffset(80)}
        >
          <span>5</span>
        </button>
      </li>
      <li
        className={`w-10 h-10 rounded ${
          offset === 100
            ? "bg-accent text-buttonText shadow-inner"
            : "shadow-md text-text hover:bg-accent hover:text-buttonText"
        }`}
      >
        <button
          className="flex items-center justify-center w-full h-full "
          onClick={() => setOffset(100)}
        >
          <span>6</span>
        </button>
      </li>
      <li className="w-10 h-10 shadow-md rounded hover:bg-accent hover:text-buttonText">
        <button
          className="flex items-center justify-center w-full h-full"
          onClick={() => setOffset((prev) => prev + 20)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </li>
    </ul>
  );
}
