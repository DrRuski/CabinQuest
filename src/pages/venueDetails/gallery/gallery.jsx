import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

VenueDesktopGallery.propTypes = {
  venue: PropTypes.array,
};

export function VenueDesktopGallery({ venue }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (venue && venue.length > 0) {
      setSelectedImage(venue[0]);
    }
  }, [venue]);

  function handleImageClick(image) {
    setSelectedImage(image);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 md:gap-3">
      <div className="md:col-span-6 md:row-span-2">
        <img
          className="w-full h-full object-cover aspect-4/3 rounded"
          src={
            selectedImage && selectedImage.length > 0
              ? selectedImage
              : "/assets/images/imageNotFound.png"
          }
          alt={`Venue ${selectedImage}`}
        />
      </div>
      {venue?.map((image, index) => (
        <div key={index} className="md:col-span-1 md:row-span-1 cursor-pointer">
          <img
            className={`w-full h-full object-cover aspect-square rounded ${
              image === selectedImage
                ? "ring-2 ring-offset-2 ring-accent"
                : "opacity-50"
            }`}
            src={image}
            alt={`Venue ${index}`}
            onClick={() => handleImageClick(image)}
          />
        </div>
      ))}
    </div>
  );
}

VenueMobileGallery.propTypes = {
  venue: PropTypes.array,
};

export function VenueMobileGallery({ venue }) {
  const [slide, setSlide] = useState(0);

  function handleNextSlide() {
    setSlide(slide === venue.length - 1 ? 0 : slide + 1);
  }
  function handlePrevSlide() {
    setSlide(slide === 0 ? venue.length - 1 : slide - 1);
  }

  return (
    <div className="relative flex justify-center items-center">
      <FontAwesomeIcon
        icon={faArrowAltCircleLeft}
        onClick={handlePrevSlide}
        className="absolute w-5 h-5 text-text bg-buttonText left-4 shadow cursor-pointer border rounded-full border-buttonText"
      />
      {venue?.map((image, index) => {
        return (
          <img
            src={image}
            alt={image}
            key={index}
            className={`block w-full h-full object-cover aspect-4/3 rounded ${
              slide === index ? "opacity-100" : "opacity-0 hidden"
            }`}
          />
        );
      })}
      <FontAwesomeIcon
        icon={faArrowAltCircleRight}
        onClick={handleNextSlide}
        className="absolute w-5 h-5 text-text bg-buttonText right-4 shadow cursor-pointer border rounded-full border-buttonText"
      />

      <span className="absolute flex gap-2 bottom-2">
        {venue?.map((_, index) => {
          return (
            <button key={index} onClick={() => setSlide(index)}>
              {slide === index ? (
                <FontAwesomeIcon
                  className="h-3 w-3 border rounded-full border-buttonText bg-buttonText shadow"
                  icon={faCircleDot}
                />
              ) : (
                <FontAwesomeIcon
                  className="h-3 w-3 text-border opacity-50"
                  icon={faCircle}
                />
              )}
            </button>
          );
        })}
      </span>
    </div>
  );
}
