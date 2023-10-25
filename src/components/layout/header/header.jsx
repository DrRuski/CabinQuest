import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../App";

export default function Header() {
  return (
    <header>
      <NavBar />
    </header>
  );
}

function NavBar() {
  const { userData } = useContext(UserContext);
  return (
    <nav>
      <ul className="flex gap-5 text-text">
        <li>
          <NavLink
            to="home"
            className={({ isActive }) => (isActive ? "active" : "inActive")}
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) => (isActive ? "active" : "inActive")}
          >
            DASHBOARD
          </NavLink>
        </li>
        <li>
          <NavLink
            to={userData ? `user/${userData.name}` : "user/Guest"}
            className={({ isActive }) => (isActive ? "active" : "inActive")}
          >
            {userData ? userData.name : "Guest"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
