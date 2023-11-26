import PropTypes from "prop-types";
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

export default function VenueDetails() {
  // const { userData } = useContext(UserContext);
  let params = useParams();

  const { data, isLoading } = useDynamicFetch(
    `${API_BASE_URL}${VENUES_ENDPOINT}/${params.id}?${QUERY_PARAMS}`,
    getData
  );
  document.title = `${data?.name}`;

  return (
    <section className="container mx-auto">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="flex flex-col gap-16">
            <h1>{data?.name}</h1>
          </div>
          <ImageGridDisplay images={data?.media} />
        </>
      )}
    </section>
  );
}

ImageGridDisplay.propTypes = {
  images: PropTypes.array,
};

function ImageGridDisplay({ images }) {
  console.log(images);
  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };
  return (
    <div>
      <ul className="grid grid-cols-5 grid-rows-2">
        {images?.map((image, index) => {
          return (
            <li key={index}>
              <img
                className="w-[450px] object-cover aspect-square"
                src={image}
                alt=""
                onError={handleImageError}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
