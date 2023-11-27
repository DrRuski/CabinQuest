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
import { useEffect, useState } from "react";

export default function VenueDetails() {
  // const { userData } = useContext(UserContext);
  let params = useParams();

  const { data, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${VENUES_ENDPOINT}/${params.id}?${QUERY_PARAMS}`,
    getData
  );
  document.title = `${data?.name}`;

  return (
    <section className="container mx-auto px-3 md:px-0">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px]">
          <div className="flex-1">
            <ImageGridDisplay venue={data?.media} />
          </div>
          <div className="flex flex-col gap-4 flex-1">
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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (venue && venue.length > 0) {
      setSelectedImage(venue[0]);
    }
  }, [venue]);

  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };

  function handleImageClick(image) {
    setSelectedImage(image);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 md:gap-3">
      <div className="md:col-span-6 md:row-span-2">
        <img
          className="w-full h-full object-cover aspect-4/3 rounded"
          src={selectedImage}
          alt={`Venue ${selectedImage}`}
          onError={handleImageError}
        />
      </div>
      {venue?.map((image, index) => (
        <div key={index} className="md:col-span-1 md:row-span-1 cursor-pointer">
          <img
            className={`w-full h-full object-cover aspect-square rounded ${
              image === selectedImage
                ? "ring-2 ring-offset-2 ring-accent"
                : "opacity-50"
            }`}
            src={image}
            alt={`Venue ${index}`}
            onError={handleImageError}
            onClick={() => handleImageClick(image)}
          />
        </div>
      ))}
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
