import PropTypes from "prop-types";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faEarthAmericas,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

VenueLocation.propTypes = {
  venue: PropTypes.object,
};

export default function VenueLocation({ venue }) {
  return (
    <div className="flex flex-col gap-3 shadow rounded p-3 border border-border flex-1">
      <h2 className="font-bold">Venue Location</h2>
      <div className="flex flex-col gap-3">
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faAddressBook} />
          <span>
            {venue?.address} {venue?.zip},{venue?.city}
          </span>
        </p>
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faEarthAmericas} />
          <span>{venue?.country}</span>
        </p>
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faMapLocation} />
          <span>{venue?.continent}</span>
        </p>
      </div>
    </div>
  );
}
