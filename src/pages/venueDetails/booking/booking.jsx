import PropTypes from "prop-types";
import { useEffect, useState } from "react";

VenueBooking.propTypes = {
  venue: PropTypes.array,
};

export default function VenueBooking({ venue }) {
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    if (venue && venue.length > 0) {
      setBookings(venue[0]);
    }
  }, [venue]);
  console.log(bookings);
  return <div>hello</div>;
}
