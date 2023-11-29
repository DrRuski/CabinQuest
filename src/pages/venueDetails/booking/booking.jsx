import PropTypes from "prop-types";
import Calendar from "@demark-pro/react-booking-calendar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";

import { postData } from "../../../data/headers/postData";
import { API_BASE_URL, CREATE_BOOKING } from "../../../data/url/url";

VenueBooking.propTypes = {
  venue: PropTypes.object,
  innerProps: PropTypes.string,
  setData: PropTypes.func,
};

export default function VenueBooking({ venue, setData }) {
  const { userData } = useContext(UserContext);
  const [selectedDates, setSelectedDates] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [guests, setGuests] = useState("");
  const handleChange = (e) => setSelectedDates(e);

  useEffect(() => {
    if (venue && venue.bookings.length > 0) {
      const reservedDates = venue.bookings.map((date) => ({
        startDate: new Date(date.dateFrom),
        endDate: new Date(date.dateTo),
      }));
      setReserved(reservedDates);
    }
  }, [venue]);

  const onSubmit = async (id) => {
    if (id && selectedDates && selectedDates.length > 0) {
      const userSelectedDate = {
        dateFrom: new Date(Math.min(...selectedDates)),
        dateTo: new Date(Math.max(...selectedDates)),
        guests: Number(guests),
        venueId: id,
      };

      try {
        const response = await postData(
          `${API_BASE_URL}${CREATE_BOOKING}`,
          userData.accessToken,
          userSelectedDate
        );
        if (response.ok) {
          const newBooking = await response.json();
          setData((prevData) => ({
            ...prevData,
            bookings: [...prevData.bookings, newBooking],
          }));
        }
      } catch (error) {
        console.error("Network error", error);
      }
    }
  };

  console.log(reserved);

  return (
    <div className="flex flex-col shadow rounded border border-border p-2 gap-2">
      <div>
        <Calendar
          selected={selectedDates}
          onChange={handleChange}
          onOverbook={(e, err) => alert(err)}
          components={{
            DayCellFooter: ({ innerProps }) => (
              <div {...innerProps}>
                <span className={`text-sm `}></span>
              </div>
            ),
          }}
          reserved={reserved}
          variant="booking"
          dateFnsOptions={{ weekStartsOn: 1 }}
          range={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start">
          <input
            min={1}
            max={venue.maxGuests}
            value={guests}
            onChange={(e) => {
              let { value, min, max } = e.target;
              value = Math.max(
                Number(min),
                Math.min(Number(max), Number(value))
              );
              setGuests(value);
            }}
            placeholder="Attending Guests"
            className="border border-border rounded shadow p-2 w-full"
            type="number"
            name="guests"
          />
        </div>
        <button
          onClick={() => onSubmit(venue.id)}
          className="bg-primary text-buttonText p-2 rounded hover:bg-accent"
        >
          Book Venue
        </button>
      </div>
    </div>
  );
}
