import PropTypes from "prop-types";
// import { useContext } from "react";
// import { UserContext } from "../../context/context";
import Loader from "../../misc/loader";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  QUERY_PARAMS,
  VENUES_ENDPOINT,
} from "../../data/url/url";
import useDynamicFetch from "../../data/useDynamicFetch";
import { getData } from "../../data/headers/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faBreadSlice,
  faEarthAmericas,
  faMapLocation,
  faMoneyBill,
  faParking,
  faPaw,
  faPeopleGroup,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "../../misc/StarRating";

export default function VenueDetails() {
  // const { userData } = useContext(UserContext);
  let params = useParams();

  const { data, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${VENUES_ENDPOINT}/${params.id}?${QUERY_PARAMS}`,
    getData
  );
  document.title = `${data?.name}`;

  console.log(data);

  return (
    <section className="container mx-auto px-3 md:px-0">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-[100px] justify-center">
          <ImageGridDisplay venue={data?.media} />
          <div className="flex flex-col gap-4 md:w-[600px]">
            <VenueDescription venue={data} />
            <div className="flex flex-col md:flex-row gap-4">
              <VenuePricing venue={data} />
              <VenueLocation venue={data?.location} />
            </div>
            <VenueAmenities venue={data?.meta} />
          </div>
        </div>
      )}
    </section>
  );
}

ImageGridDisplay.propTypes = {
  venue: PropTypes.array,
};

function ImageGridDisplay({ venue }) {
  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };

  return (
    <div>
      <ul className="grid grid-cols-3 gap-1">
        {venue?.map((image, index) => {
          return (
            <li key={index}>
              <img
                className="w-full object-cover"
                src={image}
                alt=""
                onError={handleImageError}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

VenueDescription.propTypes = {
  venue: PropTypes.object,
};

function VenueDescription({ venue }) {
  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <img
          className="w-6 object-cover aspect-square rounded"
          src={venue?.owner.avatar}
          alt={venue?.owner.name}
          onError={handleImageError}
        />
        <span>-</span>
        <h3>{venue?.owner.name}</h3>
        <span>-</span>
        <p>{venue?.owner.email}</p>
      </div>
      <hr className="border border-border" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <h1 className="text-xl font-bold">{venue?.name}</h1>
          <StarRating
            rating={venue?.rating}
            color="#36ab47"
            className="flex items-center gap-3 shadow-sm rounded px-2 py-1 border border-border"
          />
        </div>
        <p className="md:leading-7">{venue?.description}</p>
      </div>
    </div>
  );
}

VenuePricing.propTypes = {
  venue: PropTypes.object,
};

function VenuePricing({ venue }) {
  return (
    <div className="flex flex-col gap-3 shadow rounded p-3 border border-border flex-1">
      <h2 className="font-bold">Venue Pricing and Accommodations</h2>
      <div className="flex flex-col gap-3">
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faMoneyBill} />
          <span>${venue?.price} / night</span>
        </p>
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faPeopleGroup} />
          <span>{venue?.maxGuests}</span>
        </p>
      </div>
    </div>
  );
}
VenueLocation.propTypes = {
  venue: PropTypes.object,
};

function VenueLocation({ venue }) {
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

VenueAmenities.propTypes = {
  venue: PropTypes.object,
};

function VenueAmenities({ venue }) {
  console.log(venue?.pets);
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
