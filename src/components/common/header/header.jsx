import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faDashboard,
  faEdit,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import SignInButton from "./signInButton";
import UserAvatar from "./userAvatar";

export default function Header() {
  return (
    <header className="shadow bg-background sticky top-0 z-50 py-4">
      <NavBar />
    </header>
  );
}

function NavBar() {
  const [isOpenBell, setIsOpenBell] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { userData } = useContext(UserContext);
  return (
    <nav className="container mx-auto flex items-center gap-4 justify-between h-full">
      <div className="cursor-pointer p-2 rounded hover:shadow-md hover:text-accent">
        <NavLink to="/">
          Cabin<span className="font-bold">Quest</span>
        </NavLink>
      </div>

      <div className="flex gap-7">
        {userData.name ? (
          <>
            <button>
              <FontAwesomeIcon
                onClick={() => setIsOpenBell((isOpen) => !isOpen)}
                type="button"
                className={`flex justify-center items-center p-2 cursor-pointer rounded ${
                  isOpenBell
                    ? "text-primary shadow"
                    : "text-secondary hover:text-accent hover:shadow"
                }`}
                icon={faBell}
                size="lg"
              />
            </button>

            <div className="flex flex-col items-end relative">
              <UserAvatar
                userData={userData}
                setIsOpenDropDown={setIsOpenDropDown}
              />
              {isOpenDropDown && (
                <div className="flex flex-col gap-10 items-center px-3 py-5 rounded bg-background absolute top-14 lg:w-[200px] shadow-md">
                  <h3 className="font-semiBold">{userData.name}</h3>
                  <ul className="flex flex-col items-start gap-5">
                    <DropdownItem
                      text="My Profile"
                      userData={userData}
                      icon={faUser}
                      location={`user/${userData.name}`}
                    />
                    <DropdownItem
                      text="Edit Profile"
                      userData={userData}
                      icon={faEdit}
                      location={`user/${userData.name}`}
                    />
                    <DropdownItem
                      text="Dashboard"
                      icon={faDashboard}
                      location="dashboard"
                    />
                    <DropdownItem
                      text="Logout"
                      icon={faSignOut}
                      location="login"
                    />
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  );
}

DropdownItem.propTypes = {
  icon: PropTypes.object,
  size: PropTypes.string,
  location: PropTypes.string,
  text: PropTypes.string,
};

function DropdownItem({ location, text, icon, size = "md" }) {
  return (
    <li className="flex gap-2 items-center p-2 rounded hover:shadow-md w-full hover:bg-secondary">
      <FontAwesomeIcon size={size} icon={icon} />
      <NavLink to={location}>
        <span>{text}</span>
      </NavLink>
    </li>
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
