import PropTypes from "prop-types";
import { useState } from "react";
import FormInput from "../../../../components/common/form/formInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

FormPageOTwo.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default function FormPageOTwo({ register, errors }) {
  const [mediaTwo, setMediaTwo] = useState(false);
  const [mediaThree, setMediaThree] = useState(false);

  return (
    <>
      <h3 className="font-heading font-semiBold text-xl text-center">
        Venue Commodities and Media
      </h3>

      <div className="flex flex-col gap-1">
        <h4 className="font-semiBold">Commodities</h4>
        <div className="grid grid-cols-2 gap-5 p-2 rounded shadow-md">
          <FormInput
            label="Wifi"
            type="checkbox"
            register={register}
            name="wifi"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
          <FormInput
            label="Parking"
            type="checkbox"
            register={register}
            name="parking"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
          <FormInput
            label="Breakfast"
            type="checkbox"
            register={register}
            name="breakfast"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
          <FormInput
            label="Pets"
            type="checkbox"
            register={register}
            name="pets"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <FormInput
          label="Media - #1"
          type="text"
          register={register}
          name="media.0"
          errors={errors}
          className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
          labelStyle="font-semiBold"
        />

        {mediaTwo && (
          <FormInput
            label="Media - #2"
            type="text"
            register={register}
            name="media.1"
            errors={errors}
            className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
            labelStyle="font-semiBold"
          />
        )}
        {mediaThree && (
          <FormInput
            label="Media - #3"
            type="text"
            register={register}
            name="media.2"
            errors={errors}
            className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
            labelStyle="font-semiBold"
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
      </div>
    </>
  );
}
