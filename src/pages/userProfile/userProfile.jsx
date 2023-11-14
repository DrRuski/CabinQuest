import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBuildingShield } from "@fortawesome/free-solid-svg-icons";

export default function UserProfile() {
  const { userData } = useContext(UserContext);
  document.title = `${userData.name}`;

  return (
    <section className="container mx-auto h-screen px-3 md:px-0">
      <div className="mx-auto flex flex-col gap-2 items-center p-2 md:p-10 shadow-xl border rounded border-border w-fit">
        <UserAvatar userData={userData} />
        <UserInformation userData={userData} />
      </div>
    </section>
  );
}

UserAvatar.propTypes = {
  userData: PropTypes.object,
};

function UserAvatar({ userData }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
      {userData.avatar ? (
        <button type="button" className="w-fit md:h-[400px]">
          <img
            className="object-cover w-full h-full rounded"
            src={userData.avatar}
            alt={userData.name}
          />
        </button>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[400px] p-1 font-bold rounded bg-border hover:shadow-md">
          <FontAwesomeIcon size="2xl" icon={faUser} />
        </div>
      )}
      <input
        value="Update Avatar"
        type="button"
        className="p-2 rounded underline w-full cursor-pointer hover:shadow hover:bg-accent hover:text-buttonText"
      />
    </div>
  );
}

UserInformation.propTypes = {
  userData: PropTypes.object,
};

function UserInformation({ userData }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">{userData.name}</h1>
        <h2 className="text-lg">{userData.email}</h2>
      </div>
      {userData.venueManager ? (
        <p className="rounded shadow p-2 bg-accent text-buttonText w-full text-center">
          <FontAwesomeIcon icon={faBuildingShield} className="me-2" />
          <span>Venue Manager</span>
        </p>
      ) : (
        <button
          className="rounded shadow p-2 bg-primary text-buttonText w-full hover:bg-accent"
          type="button"
        >
          <span>Become a venue manager today!</span>
        </button>
      )}
    </div>
  );
}
