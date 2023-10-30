import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import imageNotFound from "../../assets/images/imageNotFound.png";

VenueList.propTypes = {
  venueData: PropTypes.array,
};

export default function VenueList({ venueData }) {
  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {venueData?.map((venue) => (
          <Venue key={venue.id} venue={venue} />
        ))}
      </ul>
    </div>
  );
}

Venue.propTypes = {
  venue: PropTypes.object,
};

function Venue({ venue }) {
  const capitalize = (str) => {
    if (!str || typeof str !== "string") {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <li>
      <Link className="flex flex-col shadow rounded text-text border border-background cursor-pointer h-full">
        <div>
          <img
            className="object-cover aspect-square rounded-t"
            src={venue.media ? venue.media : imageNotFound}
            alt={venue.name}
          />
        </div>
        <div className="flex justify-between">
          <h3 className="font-heading font-bold">{venue.name}</h3>
          <p>{venue.rating}⭐</p>
        </div>

        <p>{`${capitalize(venue.location.city)}, ${venue.location.country}`}</p>
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
      </Link>
    </li>
  );
}
