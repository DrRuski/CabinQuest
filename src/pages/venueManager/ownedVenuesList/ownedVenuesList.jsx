import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getProfileContents } from "../../../data/headers/getProfileContents";
import { API_BASE_URL, DELETE_VENUE, PROFILE } from "../../../data/url/url";
import { Link } from "react-router-dom";
import { deleteData } from "../../../data/headers/deleteData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

OwnedVenuesList.propTypes = {
  userData: PropTypes.object,
};

export default function OwnedVenuesList({ userData }) {
  const [ownedVenues, setOwnedVenues] = useState([]);

  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };

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
          `${API_BASE_URL}${PROFILE}${userData.name}/venues`,
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

  function handleDeleteVenue(id, accessToken) {
    console.log(id);
    setOwnedVenues((venues) => venues.filter((venue) => venue.id !== id));
    deleteData(`${API_BASE_URL}${DELETE_VENUE}${id}`, accessToken);
    console.log(`${API_BASE_URL}${DELETE_VENUE}${id}`);
  }

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {ownedVenues?.map((venue) => (
          <li key={venue.id}>
            <Link
              to={`/venue/${venue.id}`}
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
                <div className="flex flex-col gap-1"></div>
              </div>
            </Link>
            <button
              className="p-1 bg-error rounded"
              onClick={() => handleDeleteVenue(venue.id, userData.accessToken)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
