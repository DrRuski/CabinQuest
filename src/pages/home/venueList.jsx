import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faParking,
  faPaw,
  faStar,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

VenueList.propTypes = {
  venueData: PropTypes.array,
};

export default function VenueList() {
  const { data } = useContext(DataContext);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data?.map((venue) => (
        <VenueListing key={venue.id} venue={venue} />
      ))}
    </ul>
  );
}

VenueListing.propTypes = {
  venue: PropTypes.object,
  index: PropTypes.number,
  keyID: PropTypes.string,
};

function VenueListing({ venue }) {
  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };

  return (
    <li>
      <Link
        to={`venue/${venue.id}`}
        className="flex flex-col h-full shadow hover:shadow-xl rounded cursor-pointer"
      >
        <div>
          <img
            className="object-cover aspect-square rounded-t w-full h-full"
            src={
              venue.media
                ? venue.media[0]
                : "/src/assets/images/imageNotFound.png"
            }
            alt={venue.name}
            onError={handleImageError}
          />
        </div>

        <div className="flex flex-col justify-between gap-3 p-2 h-full">
          <div className="flex flex-col gap-1">
            <VenueHeading venue={venue} />
            <VenueLocation venue={venue} />
          </div>
          <VenuePrice venue={venue} />
        </div>
      </Link>
    </li>
  );
}

VenueHeading.propTypes = {
  venue: PropTypes.object,
};

function VenueHeading({ venue }) {
  return (
    <div className="flex justify-between flex-wrap">
      <h3 className="font-heading font-bold text-base md:text-xl">
        {venue.name}
      </h3>
      <p className="flex items-center gap-2 rounded">
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        {venue.rating}
      </p>
    </div>
  );
}

VenueLocation.propTypes = {
  venue: PropTypes.object,
};

function VenueLocation({ venue }) {
  const capitalize = (str) => {
    if (!str || typeof str !== "string") {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div>
      <p>{`${capitalize(venue.location.city)}, ${venue.location.country}`}</p>
    </div>
  );
}

VenueAmenities.propTypes = {
  venue: PropTypes.object,
};

function VenueAmenities({ venue }) {
  return (
    <ul className="grid grid-cols-2 gap-1">
      <li>
        <p className={`${venue.meta.wifi ? "font-semiBold" : "line-through"}`}>
          <FontAwesomeIcon icon={faWifi} /> <span className="ms-1">Wifi</span>
        </p>
      </li>

      <li>
        <p
          className={`${
            venue.meta.breakfast ? "font-semiBold" : "line-through"
          }`}
        >
          <FontAwesomeIcon icon={faBreadSlice} />{" "}
          <span className="ms-1">Breakfast</span>
        </p>
      </li>
      <li>
        <p className={`${venue.meta.pets ? "font-semiBold" : "line-through"}`}>
          <FontAwesomeIcon icon={faPaw} /> <span className="ms-1">Pets</span>
        </p>
      </li>
      <li>
        <p
          className={`${venue.meta.parking ? "font-semiBold" : "line-through"}`}
        >
          <FontAwesomeIcon icon={faParking} />{" "}
          <span className="ms-1">Parking</span>
        </p>
      </li>
    </ul>
  );
}

VenuePrice.propTypes = {
  venue: PropTypes.object,
};

function VenuePrice({ venue }) {
  return (
    <div className="flex items-center justify-end">
      <h3 className="flex gap-2 items-baseline">
        <span className="font-semiBold text-base md:text-xl">
          {venue.price}$
        </span>
        <span>/ night</span>
      </h3>
    </div>
  );
}
