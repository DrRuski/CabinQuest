import PropTypes from "prop-types";
import Loader from "../../misc/loader";
import Hero from "./hero";
import VenueList from "./venueList";

Home.propTypes = {
  venueData: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function Home({ isLoading }) {
  document.title = "Home";

  return (
    <section className="flex flex-col">
      <Hero isLoading={isLoading} />
      {isLoading ? <Loader /> : <VenueList />}
    </section>
  );
}
