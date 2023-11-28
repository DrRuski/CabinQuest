import {
  faBreadSlice,
  faParking,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
VenueAmenities.propTypes = {
  venue: PropTypes.object,
};

export default function VenueAmenities({ venue }) {
  return (
    <div className="flex flex-col gap-3 shadow rounded p-3 border border-border">
      <h2 className="font-bold">Venue Amenities</h2>
      <ul className="grid grid-cols-2 gap-2 md:gap-5">
        <li
          className={`flex items-center justify-center gap-3 rounded p-1 shadow ${
            venue?.wifi ? "bg-primary text-buttonText" : "bg-border"
          }`}
        >
          <FontAwesomeIcon icon={faWifi} />
          <span>Wifi</span>
        </li>

        <li
          className={`flex items-center justify-center gap-3 rounded p-1 shadow ${
            venue?.parking ? "bg-primary text-buttonText" : "bg-border"
          }`}
        >
          <FontAwesomeIcon icon={faParking} />
          <span>Parking</span>
        </li>

        <li
          className={`flex items-center justify-center gap-3 rounded p-1 shadow ${
            venue?.pets ? "bg-primary text-buttonText" : "bg-border"
          }`}
        >
          <FontAwesomeIcon icon={faPaw} />
          <span>Pets</span>
        </li>

        <li
          className={`flex items-center justify-center gap-3 rounded p-1 shadow ${
            venue?.breakfast ? "bg-primary text-buttonText" : "bg-border"
          }`}
        >
          <FontAwesomeIcon icon={faBreadSlice} />
          <span>Breakfast</span>
        </li>
      </ul>
    </div>
  );
}
