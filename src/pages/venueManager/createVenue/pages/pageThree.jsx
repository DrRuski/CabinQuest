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
      <h3 className="font-heading font-semiBold text-xl text-center">
        Venue Location Details
      </h3>
      <FormInput
        label="Street Address"
        type="text"
        register={register}
        name="address"
        errors={errors}
        className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />
      <FormInput
        label="City"
        type="text"
        register={register}
        name="city"
        errors={errors}
        className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />
      <FormInput
        label="Zip"
        type="text"
        register={register}
        name="zip"
        errors={errors}
        className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />
      <Controller
        name="country"
        render={({ field: { name, onChange, value } }) => (
          <div className="flex flex-col gap-1">
            <label className="font-semiBold">Country</label>
            <CountryDropdown
              classes="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
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
        value="Publish Venue"
        className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
      />
    </>
  );
}
