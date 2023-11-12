import PropTypes from "prop-types";

UserAvatar.propTypes = {
  userData: PropTypes.object,
  setIsOpenDropDown: PropTypes.func,
};

export default function UserAvatar({ userData, setIsOpenDropDown }) {
  return (
    <>
      {userData.avatar ? (
        <button
          type="button"
          className="p-1 h-10 w-10 rounded hover:bg-accent hover:shadow-md"
          onClick={() => setIsOpenDropDown((open) => !open)}
        >
          <img
            className="object-cover w-full h-full rounded-full shadow-md"
            src={userData.avatar}
            alt={userData.name}
          />
        </button>
      ) : (
        <button
          type="button"
          className="p-1 h-10 w-10 bg-primary text-buttonText font-bold rounded hover:bg-accent hover:shadow-md"
          onClick={() => setIsOpenDropDown((open) => !open)}
        >
          {userData.name.slice(0, 1)}
        </button>
      )}
    </>
  );
}
