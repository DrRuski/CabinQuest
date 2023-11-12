import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronRight,
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
  const { userData, setUserData } = useContext(UserContext);
  const dropdown = useRef();

  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (
        isOpenDropDown &&
        dropdown.current &&
        !dropdown.current.contains(e.target)
      ) {
        setIsOpenDropDown(false);
      }
    };
    document.addEventListener("click", checkIfClickOutside);
    return () => {
      document.removeEventListener("click", checkIfClickOutside);
    };
  }, [isOpenDropDown]);

  return (
    <nav className="container mx-auto flex items-center justify-between px-1">
      <NavLink to="/" className="cursor-pointer text-text text-xl">
        Cabin<span className="font-bold">Quest</span>
      </NavLink>

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

            <div className="flex flex-col items-end relative" ref={dropdown}>
              <UserAvatar
                userData={userData}
                setIsOpenDropDown={setIsOpenDropDown}
              />
              {isOpenDropDown && (
                <div className="flex flex-col gap-10 px-3 py-5 rounded bg-background absolute top-11 lg:w-[200px] shadow-md border border-opacity-30 border-border">
                  <h3 className="font-semiBold mt-2 text-center">
                    {userData.name}
                  </h3>
                  <ul
                    id="dropdown"
                    className="flex flex-col gap-5 justify-start "
                  >
                    <DropdownItem
                      text="My Profile"
                      userData={userData}
                      icon={faUser}
                      location={`user/${userData.name}`}
                      clickLogic={() => setIsOpenDropDown(false)}
                    />
                    <DropdownItem
                      text="Edit Profile"
                      userData={userData}
                      icon={faEdit}
                      location={`user/${userData.name}`}
                      clickLogic={() => setIsOpenDropDown(false)}
                    />
                    <DropdownItem
                      text="Dashboard"
                      icon={faDashboard}
                      location="dashboard"
                      clickLogic={() => setIsOpenDropDown(false)}
                    />
                    <DropdownItem
                      text="Logout"
                      icon={faSignOut}
                      location="login"
                      clickLogic={() => setUserData({}, "userProfile")}
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
  clickLogic: PropTypes.func,
};

function DropdownItem({ location, text, icon, size, clickLogic }) {
  return (
    <li>
      <NavLink
        to={location}
        onClick={clickLogic}
        className={`flex items-center justify-between p-2 rounded hover:shadow-md w-full hover:bg-secondary`}
      >
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon size={size} icon={icon} />
          <h5>{text}</h5>
        </div>
        <FontAwesomeIcon icon={faChevronRight} />
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
