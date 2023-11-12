import Form from "../../../components/common/form/form";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { postData } from "../../../data/headers/postData";
import { API_BASE_URL, VENUES_ENDPOINT } from "../../../data/url/url";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import FormPageOne from "./pages/pageOne";
import FormPageOTwo from "./pages/pageTwo";
import FormPageOThree from "./pages/pageThree";

CreateVenueForm.propTypes = {
  userData: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  setIsOpen: PropTypes.func,
};

export default function CreateVenueForm({ userData, setIsOpen }) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      media: [""],
      country: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${VENUES_ENDPOINT}`,
        postData(data, userData.accessToken)
      );
      if (response.ok) {
        reset();
        setIsOpen(false);
        return await response.json();
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
    <div className="m-auto rounded bg-background shadow-lg lg:w-[650px] p-5 z-50">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="font-heading md:text-2xl font-bold">
            Create new venue
          </h3>
          <button onClick={() => setIsOpen((open) => !open)}>❌</button>
        </div>
        <hr className="opacity-20" />
        <Form
          className="flex flex-col justify-between h-[650px]"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        >
          <ul className="flex justify-around items-center">
            <li
              className={`flex justify-center items-center w-[50px] h-[50px] rounded-full ${
                currentPage === 1 || currentPage === 2 || currentPage === 3
                  ? "bg-accent shadow-md"
                  : ""
              }`}
            >
              <h3 className="text-buttonText font-semiBold text-xl">1</h3>
            </li>
            <div
              className={`w-10 h-1 rounded ${
                currentPage === 2 || currentPage === 3
                  ? "bg-accent opacity-100"
                  : "bg-text opacity-25"
              }`}
            ></div>
            <li
              className={`flex justify-center items-center w-[50px] h-[50px] rounded-full ${
                currentPage === 2 || currentPage === 3
                  ? "bg-accent shadow-md"
                  : ""
              }`}
            >
              <h3
                className={`font-semiBold text-xl ${
                  currentPage === 2 || currentPage === 3
                    ? "text-buttonText opacity-100"
                    : "opacity-25 text-text"
                }`}
              >
                2
              </h3>
            </li>
            <div
              className={`w-10 h-1 rounded ${
                currentPage === 3
                  ? "bg-accent opacity-100"
                  : "bg-text opacity-25"
              }`}
            ></div>
            <li
              className={`flex justify-center items-center w-[50px] h-[50px] rounded-full ${
                currentPage === 3 ? "bg-accent shadow-md" : ""
              }`}
            >
              <h3
                className={`font-semiBold text-xl ${
                  currentPage === 3
                    ? "text-buttonText opacity-100"
                    : "text-text opacity-25"
                }`}
              >
                3
              </h3>
            </li>
          </ul>

          {currentPage === 1 && (
            <FormPageOne register={register} errors={errors} />
          )}
          {currentPage === 2 && (
            <FormPageOTwo register={register} errors={errors} />
          )}
          {currentPage === 3 && (
            <FormPageOThree
              register={register}
              errors={errors}
              control={control}
            />
          )}

          <div
            className={`flex
            ${currentPage === 1 ? "justify-end" : ""}
            ${currentPage === 2 ? "justify-between" : ""}
            ${currentPage === 3 ? "justify-start" : ""}
            `}
          >
            {currentPage !== 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                type="button"
                className="flex justify-center items-center gap-3 shadow-md rounded bg-primary p-3 text-buttonText hover:bg-accent"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <p>Back</p>
              </button>
            )}
            {currentPage !== 3 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                type="button"
                className="flex justify-center items-center gap-3 shadow-md rounded bg-primary p-3 text-buttonText hover:bg-accent"
              >
                <p>Next</p>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
