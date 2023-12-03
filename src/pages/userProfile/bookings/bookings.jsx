import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteData } from "../../../data/headers/deleteData";
import { API_BASE_URL, DELETE_BOOKING, PROFILE } from "../../../data/url/url";
import formatDate from "../../../misc/formatDate";
import useDynamicFetch from "../../../data/useDynamicFetch";
import { getData } from "../../../data/headers/getData";
import Loader from "../../../misc/loader";

UserBookings.propTypes = {
  userData: PropTypes.object,
};

export default function UserBookings({ userData }) {
  const { data, setData, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${PROFILE}${userData.name}/bookings?_venue=true&_customer=true`,
    getData,
    userData.accessToken
  );

  function handleDeleteBooking(id, accessToken) {
    setData((bookings) => bookings.filter((booking) => booking.id !== id));
    deleteData(`${API_BASE_URL}${DELETE_BOOKING}${id}`, accessToken);
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold lg:text-xl">Your upcoming travels...</h1>
          <hr className="border border-border" />
        </div>
        <ul className="flex flex-col gap-3">
          {data?.map((item) => (
            <li
              className="p-2 shadow rounded border border-border"
              key={item.id}
            >
              <div className="flex justify-between h-full">
                <div className="flex gap-5 items-center">
                  <img
                    className="w-14 h-full aspect-square rounded object-cover"
                    src={item.venue.media[0]}
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm md:text-base font-semiBold">
                      {item.venue.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-5">
                        <p className="text-sm md:text-base">
                          {formatDate(item.dateFrom)}
                        </p>
                        <FontAwesomeIcon
                          size="sm"
                          icon={faArrowRight}
                          className="hidden lg:block"
                        />
                        <p className="text-sm md:text-base">
                          {formatDate(item.dateTo)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 items-start text-[10px] lg:hidden">
                        <p className="px-[4px] bg-secondary rounded text-text">
                          Arrival
                        </p>
                        <p className="px-[4px] bg-[#FCAEAE] rounded text-text">
                          Departure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleDeleteBooking(item.id, userData.accessToken)
                  }
                  className="w-10 h-10 lg:w-14 lg:h-14 bg-secondary text-text rounded hover:bg-error hover:text-buttonText self-center"
                  type="button"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
