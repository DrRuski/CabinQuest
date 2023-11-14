import PropTypes from "prop-types";
import Loader from "../../misc/loader";
import VenueList from "./venueList";

Home.propTypes = {
  venueData: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function Home({ isLoading }) {
  document.title = "Home";

  return (
    <section className="container mx-auto px-3 md:px-0">
      {isLoading ? <Loader /> : <VenueList />}
    </section>
  );
}
