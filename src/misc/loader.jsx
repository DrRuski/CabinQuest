import PropTypes from "prop-types";

Loader.propTypes = {
  className: PropTypes.string,
};

export default function Loader({
  className = "flex justify-center items-center",
}) {
  return (
    <div className={className}>
      <span className="loader"></span>
    </div>
  );
}
