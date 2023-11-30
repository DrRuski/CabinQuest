import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { capitalize } from "../../misc/capitalize";
import StarRating from "../../misc/StarRating";
import useDynamicFetch from "../../data/useDynamicFetch";
import {
  API_BASE_URL,
  QUERY_PARAMS,
  VENUES_ENDPOINT,
  VENUE_LIMITER,
} from "../../data/url/url";
import Loader from "../../misc/loader";
import { getData } from "../../data/headers/getData";

export default function VenueList() {
  const { data, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${VENUES_ENDPOINT}?${VENUE_LIMITER}&${QUERY_PARAMS}`,
    getData
  );
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.map((venue) => (
            <VenueListing key={venue.id} venue={venue} />
          ))}
        </ul>
      )}
    </>
  );
}

VenueListing.propTypes = {
  venue: PropTypes.object,
  index: PropTypes.number,
  keyID: PropTypes.string,
};

function VenueListing({ venue }) {
  const handleImageError = (e) => {
    e.target.src = "/assets/images/imageNotFound.png";
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
              venue.media && venue.media.length > 0
                ? venue.media[0]
                : "assets/images/imageNotFound.png"
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
    <div className="flex justify-between items-start gap-2">
      <h3 className="font-heading font-bold text-base">{venue.name}</h3>
      <StarRating rating={venue.rating} maxRating={1} />
    </div>
  );
}

VenueLocation.propTypes = {
  venue: PropTypes.object,
};

function VenueLocation({ venue }) {
  return (
    <div>
      <p className="flex gap-1 flex-wrap">
        <span>
          {capitalize(venue.location.city)} {venue.location.zip},
        </span>
        <span>{venue.location.country}</span>
      </p>
    </div>
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
