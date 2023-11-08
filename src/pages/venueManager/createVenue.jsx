import Form from "../../components/common/form/form";
import FormInput from "../../components/common/form/formInput";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { postData } from "../../data/headers/postData";
import { API_BASE_URL, VENUES_ENDPOINT } from "../../data/url/url";
import FormTextArea from "../../components/common/form/formTextArea";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

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
  } = useForm({
    defaultValues: {
      media: [""],
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${VENUES_ENDPOINT}`,
        postData(data, userData.accessToken)
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Error Description", response.message);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Error Description", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="m-auto rounded bg-background shadow-lg lg:w-[650px] p-5 z-50">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="font-heading md:text-2xl">Create new venue</h3>
          <button onClick={() => setIsOpen((open) => !open)}>❌</button>
        </div>
        <hr className="opacity-20" />
        <Form
          className="flex flex-col justify-between h-[650px]"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        >
          <ul className="flex justify-between items-center">
            <li
              className={`flex flex-col items-center py-1 px-2 rounded ${
                currentPage === 1 || currentPage === 2 || currentPage === 3
                  ? "bg-accent shadow-md"
                  : ""
              }`}
            >
              <h3 className="text-buttonText font-semiBold">
                Basic Information
              </h3>
            </li>
            <div
              className={`w-10 h-2 rounded opacity-25 ${
                currentPage === 2 || currentPage === 3
                  ? "bg-accent opacity-100"
                  : "bg-text"
              }`}
            ></div>
            <li
              className={`py-1 px-2 rounded ${
                currentPage === 2 || currentPage === 3
                  ? "bg-accent shadow-md"
                  : ""
              }`}
            >
              <h3
                className={`font-semiBold opacity-25 ${
                  currentPage === 2 || currentPage === 3
                    ? "text-buttonText opacity-100"
                    : "text-text"
                }`}
              >
                Commodities
              </h3>
            </li>
            <div
              className={`w-10 h-2 rounded opacity-25 ${
                currentPage === 3 ? "bg-accent opacity-100" : "bg-text"
              }`}
            ></div>
            <li
              className={`py-1 px-2 rounded ${
                currentPage === 3 ? "bg-accent shadow-md" : ""
              }`}
            >
              <h3
                className={`font-semiBold opacity-25 ${
                  currentPage === 3
                    ? "text-buttonText opacity-100"
                    : "text-text"
                }`}
              >
                Location
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
            <FormPageOThree register={register} errors={errors} />
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
                className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <span className="ms-1">Back</span>{" "}
              </button>
            )}
            {currentPage !== 3 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                type="button"
                className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
              >
                <span className="me-1">Next</span>{" "}
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

FormPageOne.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

function FormPageOne({ register, errors }) {
  const [mediaTwo, setMediaTwo] = useState(false);
  const [mediaThree, setMediaThree] = useState(false);
  return (
    <>
      <FormInput
        label="Venue Title"
        type="text"
        register={register}
        name="name"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />

      <FormTextArea
        placeholder="Write the venues description..."
        rows={5}
        label="Venue Description"
        type="text"
        register={register}
        name="description"
        errors={errors}
        className="p-2 rounded shadow-md outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />

      <FormInput
        label="Price"
        type="number"
        register={register}
        name="price"
        errors={errors}
        setValueAs={(value) => parseInt(value)}
        className="ps-2 rounded shadow-md h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
      <FormInput
        label="Allowed Amount of Guests"
        type="number"
        register={register}
        name="maxGuests"
        errors={errors}
        setValueAs={(value) => parseInt(value)}
        className="ps-2 rounded shadow-md h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />

      <FormInput
        label="Media - #1"
        type="text"
        register={register}
        name="media.0"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />

      {mediaTwo && (
        <FormInput
          label="Media - #2"
          type="text"
          register={register}
          name="media.1"
          errors={errors}
          className="ps-2 rounded shadow-md h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />
      )}
      {mediaThree && (
        <FormInput
          label="Media - #3"
          type="text"
          register={register}
          name="media.2"
          errors={errors}
          className="ps-2 rounded shadow-md h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />
      )}

      <div className="flex gap-5">
        <button
          onClick={() => setMediaTwo((open) => !open)}
          type="button"
          className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
        >
          {mediaTwo ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          <span className="ms-2">Media #2</span>
        </button>
        <button
          onClick={() => setMediaThree((open) => !open)}
          type="button"
          className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
        >
          {mediaThree ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          <span className="ms-2">Media #3</span>
        </button>
      </div>
    </>
  );
}

FormPageOTwo.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

function FormPageOTwo({ register, errors }) {
  return (
    <>
      <FormInput
        label="Venue Title"
        type="text"
        register={register}
        name="name"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
    </>
  );
}

FormPageOThree.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

function FormPageOThree({ register, errors }) {
  return (
    <>
      <FormInput
        label="Street Address"
        type="text"
        register={register}
        name="address"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
      <FormInput
        label="City"
        type="text"
        register={register}
        name="city"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
      <FormInput
        label="Zip"
        type="text"
        register={register}
        name="zip"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
      <FormInput
        label="Country"
        type="text"
        register={register}
        name="country"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
      <FormInput
        label="Continent"
        type="text"
        register={register}
        name="city"
        errors={errors}
        className="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />

      <input
        type="submit"
        value="Create Venue"
        className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
      />
    </>
  );
}
