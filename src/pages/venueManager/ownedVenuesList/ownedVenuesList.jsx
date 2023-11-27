import PropTypes from "prop-types";
import { API_BASE_URL, DELETE_VENUE } from "../../../data/url/url";
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
  data: PropTypes.array,
  setData: PropTypes.func,
  userData: PropTypes.object,
  isOpen: PropTypes.bool,
  setCreateOpen: PropTypes.func,
  setStatsOpen: PropTypes.func,
  setVenueStats: PropTypes.func,
  setUpdateOpen: PropTypes.func,
  setVenue: PropTypes.func,
};

export default function OwnedVenuesList({
  data,
  setData,
  userData,
  setCreateOpen,
  setStatsOpen,
  setVenueStats,
  setUpdateOpen,
  setVenue,
}) {
  const handleImageError = (e) => {
    e.target.src = "assets/images/imageNotFound.png";
  };

  function handleUpdateVenue(venue) {
    setVenue(venue);
    setUpdateOpen((open) => !open);
  }

  function handleDeleteVenue(id) {
    setData((venues) => venues?.filter((venue) => venue.id !== id));
    deleteData(`${API_BASE_URL}${DELETE_VENUE}${id}`, userData.accessToken);
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
          onClick={() => setCreateOpen((open) => !open)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Create New Venue</p>
        </button>
        {data?.map((venue) => (
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
                    : "assets/images/imageNotFound.png"
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
                  <span>{capitalize(venue.location.country)}</span>
                </p>
              </div>
            </div>
            <ul className="flex gap-2 absolute right-2 top-2">
              <li className="z-30">
                <button
                  onClick={() => handleUpdateVenue(venue)}
                  className="py-1 px-2 rounded text-buttonText bg-primary hover:bg-accent shadow-md"
                >
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
                  onClick={() => handleDeleteVenue(venue.id)}
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
