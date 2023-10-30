import PropTypes from "prop-types";
import Loader from "../../misc/loader";
import Hero from "./hero";
import VenueList from "./venueList";

Home.propTypes = {
  venueData: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function Home({ venueData, isLoading }) {
  document.title = "Home";

  return (
    <section className="flex flex-col gap-16 h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Hero venueData={venueData} />
          <VenueList venueData={venueData} />
        </>
      )}
    </section>
  );
}
