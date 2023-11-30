import PropTypes from "prop-types";
import VenueList from "../venueList/venueList";

Home.propTypes = {
  venueData: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function Home() {
  document.title = "Home";

  return (
    <section className="container mx-auto px-3 md:px-0">
      <VenueList />
    </section>
  );
}
