import { Route, Routes } from "react-router-dom";
import useData from "./data/read";
import Layout from "./components/layout/layout";
import AuthContainer from "./pages/authentication/authContainer";
import { useLocalStorageState } from "./misc/localStorage";
import Home from "./pages/home/home";
import UserProfile from "./pages/UserProfile/userProfile";
import VenueDetails from "./pages/VenueDetails/venueDetails";
import ManagerDashboard from "./pages/venueManager/managerDashboard";
import { DataContext, UserContext } from "./context/context";

export default function App() {
  const [userData, setUserData] = useLocalStorageState({}, "userProfile");
  const { data, isLoading } = useData(userData);
  const userValue = { userData, setUserData };
  const dataValue = { data };

  return (
    <div>
      <UserContext.Provider value={userValue}>
        <DataContext.Provider value={dataValue}>
          <Routes>
            <Route path="login" element={<AuthContainer />}></Route>
            <Route element={<Layout />}>
              <Route
                index
                path="/"
                element={<Home isLoading={isLoading} />}
              ></Route>
              <Route
                path={`user/${userData.name}`}
                element={<UserProfile />}
              ></Route>
              <Route
                path="venue/:id"
                element={<VenueDetails data={data} />}
              ></Route>
              <Route path="dashboard" element={<ManagerDashboard />}></Route>
            </Route>
          </Routes>
        </DataContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
