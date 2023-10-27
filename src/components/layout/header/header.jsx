import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
  return (
    <header className="shadow sticky top-0 z-50 py-4">
      <NavBar />
    </header>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);
  return (
    <nav className="container m-auto flex flex-col items-center gap-4 md:flex-row md:justify-between h-full">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active p-1" : "p-1")}
      >
        Cabin<span className="font-bold">Quest</span>
      </NavLink>

      <ul className="flex items-center gap-5 text-text">
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? "active p-1 font-bold" : "inActive p-1"
            }
          >
            Dashboard Toggle
          </NavLink>
        </li>
        <li>
          <FontAwesomeIcon
            onClick={() => setIsOpen((open) => !open)}
            type="button"
            className={
              isOpen
                ? "active p-1 cursor-pointer"
                : "inActive p-1 cursor-pointer"
            }
            icon={faBell}
            size="lg"
          />
        </li>
        <li>
          <NavLink
            to={userData ? `user/${userData.name}` : "user/Guest"}
            className={({ isActive }) =>
              isActive ? "active font-bold" : "inActive"
            }
          >
            {!userData ? (
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 bg-primary rounded-full text-center text-buttonText font-bold">
                  {userData.avatar
                    ? userData.avatar
                    : userData.name.slice(0, 1)}
                </div>
                {userData.name}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 bg-primary rounded-full">
                  <p className="text-center text-buttonText font-bold">G</p>
                </div>
                <p>Guest</p>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
