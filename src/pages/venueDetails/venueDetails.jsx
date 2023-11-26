import PropTypes from "prop-types";
// import { useContext } from "react";
// import { UserContext } from "../../context/context";
import Loader from "../../misc/loader";
import useData from "../../data/read";

export default function VenueDetails() {
  // const { userData } = useContext(UserContext);
  const { data, isLoading } = useData();
  document.title = `${data.name}`;

  console.log(data);

  return (
    <section className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col gap-16 h-screen">
            <h1>{data.name}</h1>
          </div>
          <ImageGridDisplay images={data.media} />
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
  // const handleImageError = (e) => {
  //   e.target.src = "/src/assets/images/imageNotFound.png";
  // };
  return (
    <div>
      {/* <ul className="flex">
        {images.map((image, index) => {
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
      </ul> */}
    </div>
  );
}
