import { Route, Routes } from "react-router-dom";
// import useData from "./data/read";
import Layout from "./components/layout/layout";
import AuthContainer from "./pages/authentication/authContainer";
import { createContext } from "react";
import { useLocalStorageState } from "./misc/localStorage";
import Home from "./pages/home";
import UserProfile from "./pages/userProfile";
import VenueDetails from "./pages/venueDetails";
import VenueManagerDashboard from "./pages/venueManager";
export const UserContext = createContext([]);

export default function App() {
  const [userData, setUserData] = useLocalStorageState({}, "userProfile");
  const userValue = { userData, setUserData };
  // const { venueData, isLoading } = useData(userData);
  return (
    <div>
      <UserContext.Provider value={userValue}>
        <Routes>
          <Route index element={<AuthContainer />}></Route>
          <Route element={<Layout />}>
            <Route path="home" element={<Home />}></Route>
            <Route
              path={`user/${userData.name}`}
              element={<UserProfile />}
            ></Route>
            <Route path="venue/:id" element={<VenueDetails />}></Route>
            <Route path="dashboard" element={<VenueManagerDashboard />}></Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
