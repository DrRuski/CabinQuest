import PropTypes from "prop-types";

UserAvatar.propTypes = {
  userData: PropTypes.object,
  setIsOpenDropDown: PropTypes.func,
};

export default function UserAvatar({ userData, setIsOpenDropDown }) {
  return (
    <div
      className="cursor-pointer p-1"
      onClick={() => setIsOpenDropDown((open) => !open)}
    >
      {userData.avatar ? (
        <img
          className="object-cover w-full h-full rounded-full shadow-md"
          src={userData.avatar}
          alt={userData.name}
        />
      ) : (
        <div className="flex justify-center items-center p-1 hover:shadow-md rounded">
          <button
            type="button"
            className="h-10 w-10 bg-primary text-buttonText font-bold rounded hover:bg-accent"
          >
            {userData.name.slice(0, 1)}
          </button>
        </div>
      )}
    </div>
  );
}
