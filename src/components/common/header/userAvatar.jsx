import PropTypes from "prop-types";

UserAvatar.propTypes = {
  userData: PropTypes.object,
  setIsOpenDropDown: PropTypes.func,
  isOpenDropDown: PropTypes.bool,
};

export default function UserAvatar({
  userData,
  isOpenDropDown,
  setIsOpenDropDown,
}) {
  return (
    <>
      {userData.avatar ? (
        <button
          type="button"
          className={`p-[2px] h-12 w-12 rounded ${
            isOpenDropDown
              ? "bg-accent shadow-md"
              : "hover:shadow-md hover:bg-accent"
          }`}
          onClick={() => setIsOpenDropDown((open) => !open)}
        >
          <img
            className="object-cover w-full h-full shadow-md rounded"
            src={userData.avatar}
            alt={userData.name}
          />
        </button>
      ) : (
        <button
          type="button"
          className={`p-1 h-12 w-12 text-buttonText font-bold rounded hover:bg-accent hover:shadow-md ${
            isOpenDropDown ? "bg-accent shadow-md" : "bg-primary"
          }`}
          onClick={() => setIsOpenDropDown((open) => !open)}
        >
          {userData.name.slice(0, 1)}
        </button>
      )}
    </>
  );
}
