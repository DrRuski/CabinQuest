import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteData } from "../../../data/headers/deleteData";
import { BookingsContext } from "../../../context/context";
import { getProfileContents } from "../../../data/headers/getProfileContents";
import { API_BASE_URL, DELETE_BOOKING, PROFILE } from "../../../data/url/url";

UserBookings.propTypes = {
  userData: PropTypes.object,
};

export default function UserBookings({ userData }) {
  const { bookings, setBookings } = useContext(BookingsContext);

  function formatDate(oldDate) {
    const newDate = new Date(oldDate);
    return newDate.toLocaleString("en-EU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    async function getBookings() {
      try {
        const response = await getProfileContents(
          `${API_BASE_URL}${PROFILE}${userData.name}/bookings?_venue=true&_customer=true`,
          userData.accessToken,
          controller
        );
        if (response.ok) {
          setBookings(await response.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    getBookings();
  }, [userData.name, userData.accessToken, setBookings]);

  function handleDeleteBooking(id, accessToken) {
    setBookings((bookings) => bookings.filter((booking) => booking.id !== id));
    deleteData(`${API_BASE_URL}${DELETE_BOOKING}${id}`, accessToken);
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Your upcoming travels...</h1>
        <hr className="border border-border" />
      </div>
      <ul className="flex flex-col gap-3">
        {bookings?.map((item) => (
          <li className="p-2 shadow rounded border border-border" key={item.id}>
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <img
                  className="w-14 h-full aspect-square rounded object-cover"
                  src={item.venue.media[0]}
                  alt=""
                />
                <div>
                  <h3 className="font-semiBold">{item.venue.name}</h3>
                  <div className="flex items-center gap-5">
                    <p className="w-fit">{formatDate(item.dateFrom)}</p>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p className="w-fit">{formatDate(item.dateTo)}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  handleDeleteBooking(item.id, userData.accessToken)
                }
                className="w-14 bg-secondary text-text rounded hover:bg-error hover:text-buttonText"
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
