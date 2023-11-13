import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

VenueList.propTypes = {
  venueData: PropTypes.array,
};

VenueItem.propTypes = {
  venue: PropTypes.object,
  index: PropTypes.number,
  keyID: PropTypes.string,
};

export default function VenueList() {
  const { data } = useContext(DataContext);
  return (
    <div className="container mx-auto px-3 md:px-0">
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.map((venue) => (
          <VenueItem key={venue.id} venue={venue} />
        ))}
      </ul>
    </div>
  );
}

function VenueItem({ venue }) {
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

        <div className="flex flex-col gap-2 py-2 px-1">
          <VenueHeading venue={venue} />
          <VenueLocation venue={venue} />
          <div>
            <ul className="grid grid-cols-2 gap-1">
              <li className="flex">
                <p>Wifi</p>
                {venue.meta.wifi ? "✅" : "❌"}
              </li>

              <li className="flex">
                <p>Breakfast</p>
                {venue.meta.breakfast ? "✅" : "❌"}
              </li>
              <li className="flex">
                <p>Pets</p>
                {venue.meta.pets ? "✅" : "❌"}
              </li>
              <li className="flex">
                <p>Parking</p>
                {venue.meta.parking ? "✅" : "❌"}
              </li>
            </ul>
          </div>
          <h3>
            <span className="font-semiBold">{venue.price}$</span> / night
          </h3>
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
      <p className="flex items-center gap-2 px-2 py-1 rounded bg-accent text-buttonText font-semiBold">
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
      <p className="font-semiBold">{`${capitalize(venue.location.city)}, ${
        venue.location.country
      }`}</p>
    </div>
  );
}
