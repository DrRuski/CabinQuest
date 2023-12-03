import Loader from "../../misc/loader";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  QUERY_PARAMS,
  VENUES_ENDPOINT,
} from "../../data/url/url";
import useDynamicFetch from "../../data/useDynamicFetch";
import { getData } from "../../data/headers/getData";
import VenueDescription from "./description/description";
import VenuePricing from "./pricing/pricing";
import VenueLocation from "./location/location";
import VenueAmenities from "./amenities/amenities";
import VenueBooking from "./booking/booking";
import { useEffect, useState } from "react";
import { VenueDesktopGallery, VenueMobileGallery } from "./gallery/gallery";

export default function VenueDetails() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  let params = useParams();

  const { data, setData, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${VENUES_ENDPOINT}/${params.id}?${QUERY_PARAMS}`,
    getData
  );
  useEffect(() => {
    if (data) {
      document.title = `${data.name}`;
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="container mx-auto px-3 md:px-0">
      {isLoading && <Loader />}
      {!isLoading && data && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px]">
          <div className="flex-1">
            {isMobile ? (
              <VenueMobileGallery venue={data?.media} />
            ) : (
              <VenueDesktopGallery venue={data?.media} />
            )}
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <VenueDescription venue={data} />
            <div className="flex flex-col md:flex-row gap-4">
              <VenuePricing venue={data} />
              <VenueLocation venue={data?.location} />
            </div>
            <VenueAmenities venue={data?.meta} />
            <VenueBooking venue={data} setData={setData} />
          </div>
        </div>
      )}
    </section>
  );
}
