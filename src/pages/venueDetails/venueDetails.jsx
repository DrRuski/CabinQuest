// import { useContext } from "react";
// import { UserContext } from "../../context/context";
import Loader from "../../misc/loader";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  QUERY_PARAMS,
  VENUES_ENDPOINT,
} from "../../data/url/url";
import useDynamicFetch from "../../data/useDynamicFetch";
import { getData } from "../../data/headers/getData";
import VenueGallery from "./gallery/gallery";
import VenueDescription from "./description/description";
import VenuePricing from "./pricing/pricing";
import VenueLocation from "./location/location";
import VenueAmenities from "./amenities/amenities";
import VenueBooking from "./booking/booking";

export default function VenueDetails() {
  // const { userData } = useContext(UserContext);
  let params = useParams();

  const { data, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${VENUES_ENDPOINT}/${params.id}?${QUERY_PARAMS}`,
    getData
  );
  document.title = `${data?.name}`;

  return (
    <section className="container mx-auto px-3 md:px-0">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px]">
          <div className="flex-1">
            <VenueGallery venue={data?.media} />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <VenueDescription venue={data} />
            <div className="flex flex-col md:flex-row gap-4">
              <VenuePricing venue={data} />
              <VenueLocation venue={data?.location} />
            </div>
            <VenueAmenities venue={data?.meta} />
            <VenueBooking venue={data?.bookings} />
          </div>
        </div>
      )}
    </section>
  );
}
