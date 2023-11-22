import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import CreateVenueForm from "./createVenueForm/createVenueForm";
import OwnedVenuesList from "./ownedVenuesList/ownedVenuesList";
import StatsScreen from "./venueStats/venueStats";

export default function ManagerDashboard() {
  const [venueStats, setVenueStats] = useState({});
  const [statsOpen, setStatsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);

  document.title = "Dashboard";

  return (
    <section className="container mx-auto px-3 md:px-0 h-full">
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-xl md:text-2xl font-semiBold">
            Welcome to your dashboard
          </h1>
          <p>
            Here you can edit, delete and even check individual stats for the
            venues that you manage.
          </p>
        </div>
        {statsOpen && (
          <StatsScreen venueStats={venueStats} setStatsOpen={setStatsOpen} />
        )}
        {isOpen && (
          <CreateVenueForm userData={userData} setIsOpen={setIsOpen} />
        )}
        <OwnedVenuesList
          userData={userData}
          setIsOpen={setIsOpen}
          statsOpen={statsOpen}
          setStatsOpen={setStatsOpen}
          setVenueStats={setVenueStats}
        />
      </div>
    </section>
  );
}
