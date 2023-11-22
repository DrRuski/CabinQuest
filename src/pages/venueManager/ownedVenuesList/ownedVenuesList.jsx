import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getProfileContents } from "../../../data/headers/getProfileContents";
import { API_BASE_URL, DELETE_VENUE, PROFILE } from "../../../data/url/url";
import { deleteData } from "../../../data/headers/deleteData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faEdit,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "../../../misc/capitalize";

OwnedVenuesList.propTypes = {
  userData: PropTypes.object,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setStatsOpen: PropTypes.func,
  setVenueStats: PropTypes.func,
};

export default function OwnedVenuesList({
  userData,
  setIsOpen,
  setStatsOpen,
  setVenueStats,
}) {
  const [ownedVenues, setOwnedVenues] = useState([]);

  // function formatDate(oldDate) {
  //   const newDate = new Date(oldDate);
  //   return newDate.toLocaleString("en-EU", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // }

  useEffect(() => {
    const controller = new AbortController();
    async function getOwnedVenues() {
      try {
        const response = await getProfileContents(
          `${API_BASE_URL}${PROFILE}${userData.name}/venues?_bookings=true`,
          userData.accessToken,
          controller
        );
        if (response.ok) {
          setOwnedVenues(await response.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    getOwnedVenues();
  }, [userData.name, userData.accessToken, setOwnedVenues]);

  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };

  function handleDeleteVenue(id, accessToken) {
    setOwnedVenues((venues) => venues.filter((venue) => venue.id !== id));
    deleteData(`${API_BASE_URL}${DELETE_VENUE}${id}`, accessToken);
  }

  function handleViewVenueStats(venue) {
    setVenueStats(venue);
    setStatsOpen(true);
  }

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <button
          type="button"
          className="flex justify-center items-center border border-border border-dashed gap-2 shadow rounded text-text hover:bg-secondary hover:shadow-xl min-h-[362px]"
          onClick={() => setIsOpen((open) => !open)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Create New Venue</p>
        </button>
        {ownedVenues?.map((venue) => (
          <li
            className="flex flex-col h-full shadow rounded relative"
            key={venue.id}
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
                <h3>{venue.name}</h3>
                <p className="flex gap-1 flex-wrap">
                  <span>
                    {capitalize(venue.location.city)} {venue.location.zip},
                  </span>
                  <span>{venue.location.country}</span>
                </p>
              </div>
            </div>
            <ul className="flex gap-2 absolute right-2 top-2">
              <li className="z-30">
                <button className="py-1 px-2 rounded text-buttonText bg-primary hover:bg-accent shadow-md">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </li>
              <li className="z-30">
                <button
                  onClick={() => handleViewVenueStats(venue)}
                  className="py-1 px-2 rounded bg-border hover:bg-accent hover:text-buttonText shadow-md"
                >
                  <FontAwesomeIcon icon={faChartLine} />
                </button>
              </li>
              <li className="z-30">
                <button
                  className="py-1 px-2 rounded bg-error shadow-md hover:text-buttonText"
                  onClick={() =>
                    handleDeleteVenue(venue.id, userData.accessToken)
                  }
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
