import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
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
    <nav className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between h-full">
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

            <div className="flex flex-col items-end">
              <UserAvatar
                userData={userData}
                setIsOpenDropDown={setIsOpenDropDown}
              />
              <div
                className={`${isOpenDropDown ? "activeMenu" : "inActiveMenu"}`}
              >
                <ul className="flex flex-col p-4 shadow-md">
                  <DropdownItem userData={userData} icon={faUser} size="sm" />
                </ul>
              </div>
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
  userData: PropTypes.object,
  icon: PropTypes.object,
  size: PropTypes.string,
};

function DropdownItem({ userData, icon, size }) {
  return (
    <>
      <li className="flex gap-2 items-center">
        <FontAwesomeIcon size={size} icon={icon} />
        <NavLink
          to={`user/${userData.name}`}
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          <span>Edit Profile</span>
        </NavLink>
      </li>
      <li className="flex gap-2 items-center">
        <FontAwesomeIcon size={size} icon={icon} />
        <NavLink
          to="dashboard"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          <span>Dashboard</span>
        </NavLink>
      </li>
    </>
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
