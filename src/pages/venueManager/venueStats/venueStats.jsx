import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import formatDate from "../../../misc/formatDate";

StatsScreen.propTypes = {
  venueStats: PropTypes.object,
  setStatsOpen: PropTypes.func,
};

export default function StatsScreen({ venueStats, setStatsOpen }) {
  return (
    <div className="rounded bg-background md:shadow-lg lg:w-[500px] p-2 md:p-5 z-40 md:absolute left-0 right-0 m-auto border border-border">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center h-fit">
              <img
                className="w-16 h-fit aspect-square rounded object-cover"
                src={venueStats.media[0]}
                alt=""
              />
              <div>
                <h1 className="md:text-2xl font-bold">{venueStats.name}</h1>
                <div className="flex gap-2 text-sm md:text-base">
                  <p>{venueStats.location.address}</p>
                  <span>-</span>
                  <p>
                    {venueStats.location.city}, {venueStats.location.zip}
                  </p>
                  <span>-</span>
                  <p>{venueStats.location.country}</p>
                </div>
              </div>
            </div>
            <button className="self-start" onClick={() => setStatsOpen(false)}>
              ❌
            </button>
          </div>

          <hr className="border border-border" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semiBold">Current User Rating</h2>
          <p className="flex items-center gap-2 rounded">
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            {venueStats.rating}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semiBold">Upcoming bookings</h2>
          <ul className="flex flex-col gap-4">
            {venueStats.bookings?.map((booking) => {
              return (
                <li key={booking.id}>
                  <div className="flex justify-between">
                    <div className="flex gap-1 md:gap-3 items-center">
                      <p>{formatDate(booking.dateFrom)}</p>
                      <FontAwesomeIcon icon={faArrowRight} />
                      <p>{formatDate(booking.dateTo)}</p>
                    </div>
                    <div className="py-1 px-2 rounded bg-primary text-buttonText font-semiBold">
                      <p>Guests: {booking.guests}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
