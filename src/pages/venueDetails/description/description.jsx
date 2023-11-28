import PropTypes from "prop-types";
import StarRating from "../../../misc/StarRating";

VenueDescription.propTypes = {
  venue: PropTypes.object,
};

export default function VenueDescription({ venue }) {
  const handleImageError = (e) => {
    e.target.src = "assets/images/imageNotFound.png";
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <img
          className="w-6 object-cover aspect-square rounded"
          src={venue?.owner.avatar}
          alt={venue?.owner.name}
          onError={handleImageError}
        />
        <span>-</span>
        <h3>{venue?.owner.name}</h3>
        <span>-</span>
        <p>{venue?.owner.email}</p>
      </div>
      <hr className="border border-border" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <h1 className="text-xl font-bold">{venue?.name}</h1>
          <StarRating
            rating={venue?.rating}
            color="#36ab47"
            className="flex items-center gap-3 shadow-sm rounded px-2 py-1 border border-border"
          />
        </div>
        <p className="md:leading-7">{venue?.description}</p>
      </div>
    </div>
  );
}
