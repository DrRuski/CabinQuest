import FormInput from "../../../../components/common/form/formInput";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { CountryDropdown } from "react-country-region-selector";

FormPageOThree.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  control: PropTypes.object,
};

export default function FormPageOThree({ register, errors, control }) {
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
      <Controller
        name="country"
        render={({ field: { name, onChange, value } }) => (
          <div className="flex flex-col gap-1">
            <label>Country</label>
            <CountryDropdown
              classes="ps-2 rounded shadow-md h-8 outline-none outline-1 focus:shadow-md focus:shadow-primary hover:shadow-primary"
              defaultOptionLabel="Select Country"
              name={name}
              value={value}
              onChange={onChange}
            />
          </div>
        )}
        control={control}
      />

      <input
        type="submit"
        value="Create Venue"
        className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
      />
    </>
  );
}
