import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import CreateVenueForm from "./createVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ManagerDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const { userData } = useContext(UserContext);

  document.title = "Dashboard";

  return (
    <section className="container mx-auto h-full">
      <div className="">
        <button
          type="button"
          className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
          onClick={() => setIsOpen((open) => !open)}
        >
          <FontAwesomeIcon icon={faPlus} />{" "}
          <span className="ms-1">Create New Venue</span>
        </button>
      </div>
      {isOpen && <CreateVenueForm userData={userData} setIsOpen={setIsOpen} />}
    </section>
  );
}
