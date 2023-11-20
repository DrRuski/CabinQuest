import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import CreateVenueForm from "./createVenue/createVenueForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ManagerDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);

  document.title = "Dashboard";

  return (
    <section className="container mx-auto px-3 md:px-0 h-full">
      <div>
        <button
          type="button"
          className={`flex justify-center items-center gap-2 shadow-md rounded p-3 text-buttonText hover:bg-accent ${
            isOpen ? "bg-accent" : "bg-primary"
          }`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Create New Venue</p>
        </button>
      </div>
      {isOpen && <CreateVenueForm userData={userData} setIsOpen={setIsOpen} />}
    </section>
  );
}
