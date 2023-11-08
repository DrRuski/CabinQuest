import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import FormTextArea from "../../../../components/common/form/formTextArea";
import FormInput from "../../../../components/common/form/formInput";

FormPageOne.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default function FormPageOne({ register, errors }) {
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
