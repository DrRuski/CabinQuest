import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import CreateVenueForm from "./createVenueForm/createVenueForm";
import OwnedVenuesList from "./ownedVenuesList/ownedVenuesList";
import StatsScreen from "./venueStats/venueStats";
import UpdateVenueForm from "./updateVenueForm/updateVenueForm";

export default function ManagerDashboard() {
  const [ownedVenues, setOwnedVenues] = useState([]);
  const [venueStats, setVenueStats] = useState({});
  const [venue, setVenue] = useState({});
  const [statsOpen, setStatsOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
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
        {createOpen && (
          <CreateVenueForm
            userData={userData}
            setCreateOpen={setCreateOpen}
            setOwnedVenues={setOwnedVenues}
          />
        )}
        {updateOpen && (
          <UpdateVenueForm
            userData={userData}
            setUpdateOpen={setUpdateOpen}
            ownedVenues={ownedVenues}
            setOwnedVenues={setOwnedVenues}
            venue={venue}
          />
        )}
        <OwnedVenuesList
          setOwnedVenues={setOwnedVenues}
          userData={userData}
          statsOpen={statsOpen}
          setStatsOpen={setStatsOpen}
          setVenueStats={setVenueStats}
          setCreateOpen={setCreateOpen}
          setUpdateOpen={setUpdateOpen}
          ownedVenues={ownedVenues}
          setVenue={setVenue}
        />
      </div>
    </section>
  );
}
