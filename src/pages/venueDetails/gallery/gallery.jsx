import PropTypes from "prop-types";
import { useEffect, useState } from "react";

VenueGallery.propTypes = {
  venue: PropTypes.array,
};

export default function VenueGallery({ venue }) {
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
