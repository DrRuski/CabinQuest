import PropTypes from "prop-types";
import FormTextArea from "../../../../components/common/form/formTextArea";
import FormInput from "../../../../components/common/form/formInput";

FormPageOne.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default function FormPageOne({ register, errors }) {
  return (
    <>
      <h3 className="font-heading font-semiBold text-xl text-center">
        Basic Venue Information
      </h3>
      <FormInput
        label="Venue Title"
        type="text"
        register={register}
        name="name"
        errors={errors}
        className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />

      <FormTextArea
        placeholder="Write the venues description..."
        rows={5}
        label="Venue Description"
        type="text"
        register={register}
        name="description"
        errors={errors}
        className="p-2 rounded outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />

      <FormInput
        label="Price"
        type="number"
        register={register}
        name="price"
        errors={errors}
        setValueAs={(value) => parseInt(value)}
        className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />
      <FormInput
        label="Guest Count"
        type="number"
        register={register}
        name="maxGuests"
        errors={errors}
        setValueAs={(value) => parseInt(value)}
        className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
        labelStyle="font-semiBold"
      />
    </>
  );
}
