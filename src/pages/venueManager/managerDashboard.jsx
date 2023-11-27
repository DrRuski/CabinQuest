import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import CreateVenueForm from "./createVenueForm/createVenueForm";
import OwnedVenuesList from "./ownedVenuesList/ownedVenuesList";
import StatsScreen from "./venueStats/venueStats";
import UpdateVenueForm from "./updateVenueForm/updateVenueForm";
import { API_BASE_URL, PROFILE } from "../../data/url/url";

import useDynamicFetch from "../../data/useDynamicFetch";
import { getData } from "../../data/headers/getData";

export default function ManagerDashboard() {
  const { userData } = useContext(UserContext);
  const { data, setData } = useDynamicFetch(
    `${API_BASE_URL}${PROFILE}${userData.name}/venues?_bookings=true`,
    getData,
    userData.accessToken
  );
  //
  const [venueStats, setVenueStats] = useState({});
  const [statsOpen, setStatsOpen] = useState(false);
  //
  const [venue, setVenue] = useState({});
  //
  const [updateOpen, setUpdateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

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
            setData={setData}
          />
        )}
        {updateOpen && (
          <UpdateVenueForm
            data={data}
            setData={setData}
            userData={userData}
            setUpdateOpen={setUpdateOpen}
            venue={venue}
          />
        )}
        <OwnedVenuesList
          data={data}
          setData={setData}
          userData={userData}
          statsOpen={statsOpen}
          setStatsOpen={setStatsOpen}
          setVenueStats={setVenueStats}
          setCreateOpen={setCreateOpen}
          setUpdateOpen={setUpdateOpen}
          setVenue={setVenue}
        />
      </div>
    </section>
  );
}
