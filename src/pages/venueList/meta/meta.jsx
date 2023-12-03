import PropTypes from "prop-types";
import {
  faBreadSlice,
  faParking,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

MetaSearch.propTypes = {
  wifi: PropTypes.bool,
  parking: PropTypes.bool,
  pets: PropTypes.bool,
  breakfast: PropTypes.bool,
  setWifi: PropTypes.func,
  setParking: PropTypes.func,
  setPets: PropTypes.func,
  setBreakfast: PropTypes.func,
};

export default function MetaSearch({
  wifi,
  setWifi,
  parking,
  setParking,
  pets,
  setPets,
  breakfast,
  setBreakfast,
}) {
  return (
    <ul className="flex lg:gap-3 h-10 ">
      <li>
        <label
          className={`flex items-center justify-center shadow-md rounded cursor-pointer px-2 h-full ${
            wifi ? "bg-accent text-buttonText font-semiBold" : "bg-buttonText"
          }`}
          htmlFor="wifi"
        >
          <FontAwesomeIcon icon={faWifi} /> <span className="ms-2">Wifi</span>
          <input
            id="wifi"
            type="checkbox"
            checked={wifi}
            onChange={() => setWifi((prev) => !prev)}
            className="hidden"
          />
        </label>
      </li>
      <li>
        <label
          className={`flex items-center justify-center shadow-md rounded cursor-pointer px-2 h-full ${
            parking
              ? "bg-accent text-buttonText font-semiBold"
              : "bg-buttonText"
          }`}
          htmlFor="parking"
        >
          <FontAwesomeIcon icon={faParking} />{" "}
          <span className="ms-2">Parking</span>
          <input
            id="parking"
            type="checkbox"
            checked={parking}
            onChange={() => setParking((prev) => !prev)}
            className="hidden"
          />
        </label>
      </li>
      <li>
        <label
          className={`flex items-center justify-center shadow-md rounded cursor-pointer px-2 h-full ${
            pets ? "bg-accent text-buttonText font-semiBold" : "bg-buttonText"
          }`}
          htmlFor="pets"
        >
          <FontAwesomeIcon icon={faPaw} /> <span className="ms-2">pets</span>
          <input
            id="pets"
            type="checkbox"
            checked={pets}
            onChange={() => setPets((prev) => !prev)}
            className="hidden"
          />
        </label>
      </li>
      <li>
        <label
          className={`flex items-center justify-center shadow-md rounded cursor-pointer px-2 h-full ${
            breakfast
              ? "bg-accent text-buttonText font-semiBold"
              : "bg-buttonText"
          }`}
          htmlFor="breakfast"
        >
          <FontAwesomeIcon icon={faBreadSlice} />{" "}
          <span className="ms-2">Breakfast</span>
          <input
            id="breakfast"
            type="checkbox"
            checked={breakfast}
            onChange={() => setBreakfast((prev) => !prev)}
            className="hidden"
          />
        </label>
      </li>
    </ul>
  );
}
