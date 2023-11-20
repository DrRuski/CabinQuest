import PropTypes from "prop-types";
import { API_BASE_URL, UPDATE_MANAGER_STATUS } from "../../../data/url/url";
import { putData } from "../../../data/headers/putData";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingShield } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useHover from "../../../misc/onHover";

UserInformation.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
};

export default function UserInformation({ userData, setUserData }) {
  const [status, setStatus] = useState(userData.venueManager);
  const [statusButtonHover, statusButtonProps] = useHover();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      venueManager: userData.venueManager,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${UPDATE_MANAGER_STATUS}${userData.name}`,
        putData(data, userData.accessToken)
      );
      if (response.ok) {
        const updateManagerStatus = await response.json();
        setUserData({
          ...userData,
          venueManager: updateManagerStatus.venueManager,
        });
      } else {
        console.log(response);
        throw new Error("Error Description", response.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error Description", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">{userData.name}</h1>
        <h2 className="text-lg">{userData.email}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`flex gap-5 items-center w-full ${
            userData.venueManager
              ? "rounded shadow bg-accent text-buttonText w-full hover:bg-error hover:text-buttonText"
              : "rounded shadow-md bg-secondary text-text w-full hover:bg-accent hover:text-buttonText"
          }`}
        >
          <label
            htmlFor="managerStatus"
            className="cursor-pointer w-full text-center"
          >
            <div>
              {userData.venueManager ? (
                <p {...statusButtonProps} className="p-2">
                  {statusButtonHover ? (
                    <span>Are you sure you want to quit?</span>
                  ) : (
                    <span className="p-2">
                      <FontAwesomeIcon
                        icon={faBuildingShield}
                        className="me-2"
                      />
                      Venue Manager
                    </span>
                  )}
                </p>
              ) : (
                <p {...statusButtonProps} className="p-2">
                  {statusButtonHover ? (
                    <span>You Are ONE Click Away!</span>
                  ) : (
                    <span className="p-2">
                      <FontAwesomeIcon
                        icon={faBuildingShield}
                        className="me-2"
                      />
                      Become a Venue Manager Today!
                    </span>
                  )}
                </p>
              )}
            </div>
            <input
              id="managerStatus"
              type="checkbox"
              {...register("venueManager")}
              checked={status}
              onChange={(e) => {
                const updatedState = e.target.checked;
                setStatus(updatedState);
                handleSubmit(onSubmit({ venueManager: updatedState }));
              }}
              name="venueManager"
              className="hidden"
            />
          </label>
        </div>
      </form>
    </div>
  );
}
