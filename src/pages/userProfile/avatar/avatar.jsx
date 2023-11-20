import PropTypes from "prop-types";
import { useState } from "react";
import { API_BASE_URL, PROFILE } from "../../../data/url/url";
import { putData } from "../../../data/headers/putData";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Form from "../../../components/common/form/form";
import FormInput from "../../../components/common/form/formInput";

UserAvatar.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default function UserAvatar({ userData, setUserData, setIsLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await putData(
        `${API_BASE_URL}${PROFILE}${userData.name}/media`,
        data,
        userData.accessToken
      );
      if (response.ok) {
        const updateAvatar = await response.json();
        setUserData({ ...userData, avatar: updateAvatar.avatar });
        reset();
        setIsOpen(false);
      } else {
        console.log(response);
        throw new Error("Error Description", response.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error Description", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
      {userData.avatar ? (
        <img
          className="object-cover w-full md:h-[400px] rounded"
          src={userData.avatar}
          alt={userData.name}
        />
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[400px] p-1 font-bold rounded bg-border hover:shadow-md">
          <FontAwesomeIcon size="2xl" icon={faUser} />
        </div>
      )}

      {isOpen && (
        <Form
          className="w-full"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        >
          <FormInput
            type="url"
            register={register}
            name="avatar"
            errors={errors}
            className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border w-full"
            inputContainerStyle="flex"
          >
            <input
              type="submit"
              className="ms-1 p-2 rounded shadow bg-secondary hover:bg-accent hover:text-buttonText cursor-pointer"
            />
          </FormInput>
        </Form>
      )}

      {isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="p-2 rounded w-full bg-warning "
        >
          Cancel
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="p-2 rounded underline w-full hover:shadow"
        >
          Update Avatar
        </button>
      )}
    </div>
  );
}
