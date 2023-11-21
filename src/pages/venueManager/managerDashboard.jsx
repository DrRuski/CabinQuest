import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import CreateVenueForm from "./createVenueForm/createVenueForm";
import OwnedVenuesList from "./ownedVenuesList/ownedVenuesList";

export default function ManagerDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);

  document.title = "Dashboard";

  return (
    <section className="container mx-auto px-3 md:px-0 h-full">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semiBold">Welcome to your dashboard</h1>
          <p>
            Here you can edit, delete and even check individual stats for the
            venues that you manage.
          </p>
        </div>
        {isOpen && (
          <CreateVenueForm
            userData={userData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
        <OwnedVenuesList userData={userData} setIsOpen={setIsOpen} />
      </div>
    </section>
  );
}
