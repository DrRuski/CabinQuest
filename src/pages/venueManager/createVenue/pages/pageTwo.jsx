import PropTypes from "prop-types";
import FormInput from "../../../../components/common/form/formInput";

FormPageOTwo.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default function FormPageOTwo({ register, errors }) {
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
