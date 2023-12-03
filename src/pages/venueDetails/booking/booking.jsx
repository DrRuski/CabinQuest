import PropTypes from "prop-types";
import Calendar from "@demark-pro/react-booking-calendar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";

import { postData } from "../../../data/headers/postData";
import { API_BASE_URL, CREATE_BOOKING } from "../../../data/url/url";
import { useNavigate } from "react-router-dom";
import SignInButton from "../../../components/common/header/signInButton";

VenueBooking.propTypes = {
  venue: PropTypes.object,
  innerProps: PropTypes.string,
  setData: PropTypes.func,
};

export default function VenueBooking({ venue, setData }) {
  const { userData } = useContext(UserContext);
  const [bookingSucc, setBookingSucc] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();
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
          setGuests("");
          setSelectedDates([]);
          setBookingSucc(true);
        }
      } catch (error) {
        console.error("Network error", error);
      } finally {
        setTimeout(() => {
          setBookingSucc(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="flex flex-col shadow rounded border border-border p-2 gap-2 relative">
      <div className="flex items-center justify-center">
        {bookingSucc && (
          <div className="flex flex-col items-center justify-center gap-3 w-3/4 md:w-1/2 bg-buttonText shadow-xl rounded border border-border absolute z-50 text-center p-2 md:p-5">
            <div>
              <h3 className="font-bold">Booking was a success</h3>
              <hr className="w-full border border-border" />
            </div>
            <button
              onClick={() => navigate(`/user/${userData.name}`)}
              className="bg-primary p-1 w-full rounded shadow text-buttonText hover:bg-accent"
            >
              View Booking?
            </button>
          </div>
        )}
        <Calendar
          selected={selectedDates}
          onChange={handleChange}
          onOverbook={(e, err) => alert(err)}
          components={{
            DayCellFooter: ({ innerProps }) => (
              <span {...innerProps}>
                <span className="text-sm"></span>
              </span>
            ),
          }}
          reserved={reserved}
          variant="booking"
          dateFnsOptions={{ weekStartsOn: 1 }}
          range={true}
        />
      </div>
      {userData.accessToken ? (
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
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
