import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import AuthContainer from "./pages/authentication/authContainer";
import { useLocalStorageState } from "./misc/localStorage";
import Home from "./pages/home/home";
import UserProfile from "./pages/userProfile/userProfile";
import VenueDetails from "./pages/venueDetails/venueDetails";
import ManagerDashboard from "./pages/venueManager/managerDashboard";
import { UserContext, BookingsContext } from "./context/context";
import { useState } from "react";

export default function App() {
  //
  const [userData, setUserData] = useLocalStorageState({}, "userProfile");
  const userValue = { userData, setUserData };
  //
  const [bookings, setBookings] = useState([]);
  const bookingsValue = { bookings, setBookings };
  //

  return (
    <div>
      <UserContext.Provider value={userValue}>
        <BookingsContext.Provider value={bookingsValue}>
          <Routes>
            <Route path="login" element={<AuthContainer />}></Route>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />}></Route>
              <Route
                path={`user/${userData.name}`}
                element={<UserProfile />}
              ></Route>
              <Route path="venue/:id" element={<VenueDetails />}></Route>
              <Route path="dashboard" element={<ManagerDashboard />}></Route>
            </Route>
          </Routes>
        </BookingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
