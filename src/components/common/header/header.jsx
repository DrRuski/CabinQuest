import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="shadow bg-background sticky top-0 z-50 py-4">
      <NavBar />
    </header>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);
  return (
    <nav className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between h-full">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active p-1" : "p-1")}
      >
        Cabin<span className="font-bold">Quest</span>
      </NavLink>

      <ul className="flex items-center gap-5">
        <li>
          <FontAwesomeIcon
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            type="button"
            className={`flex justify-center items-center p-2 cursor-pointer rounded ${
              isOpen ? "active shadow" : "inActive hover:shadow"
            }`}
            icon={faBell}
            size="lg"
          />
        </li>
        <li>
          {userData ? (
            <NavLink
              to={userData ? `user/${userData.name}` : "user/Guest"}
              className={({ isActive }) =>
                isActive ? "active font-bold" : "inActive"
              }
            >
              <div className="flex items-center gap-2">
                {userData.avatar ? (
                  <img
                    className="object-cover w-full h-full rounded-full shadow"
                    src={userData.avatar}
                    alt={userData.name}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-primary h-9 w-9 text-buttonText shadow rounded-full">
                    <span>{userData.name.slice(0, 1)}</span>
                  </div>
                )}
                <p className="py-2">{userData.name}</p>
              </div>
            </NavLink>
          ) : (
            <NavLink
              to="login"
              className={`flex justify-center items-center py-2 px-7 rounded bg-primary shadow text-buttonText font-bold hover:bg-accent hover:text-text`}
            >
              <span>Sign Up</span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

/*
<li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex justify-center items-center p-2 ${
                isActive ? "active font-bold" : "inActive"
              }`
            }
          >
            <span>Dashboard Toggle</span>
          </NavLink>
        </li>
*/
