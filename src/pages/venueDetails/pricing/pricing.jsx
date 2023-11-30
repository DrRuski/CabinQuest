import PropTypes from "prop-types";
import { faMoneyBill, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
VenuePricing.propTypes = {
  venue: PropTypes.object,
};

export default function VenuePricing({ venue }) {
  return (
    <div className="flex flex-col gap-3 shadow rounded p-3 border border-border flex-1">
      <h2 className="font-bold">Venue Pricing and Accommodations</h2>
      <div className="flex flex-col gap-3">
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faMoneyBill} />
          <span>${venue?.price} / night</span>
        </p>
        <p className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faPeopleGroup} />
          <span>{venue?.maxGuests}</span>
        </p>
      </div>
    </div>
  );
}
