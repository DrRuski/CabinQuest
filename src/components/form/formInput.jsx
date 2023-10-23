import PropTypes from "prop-types";

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.string,
  errors: PropTypes.object,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  patternValue: PropTypes.string,
  patternMessage: PropTypes.string,
  inputStyle: PropTypes.string,
};

export default function FormInput({
  label,
  type = "text",
  name,
  register,
  required = "This field is required.",
  minLength,
  maxLength,
  errors,
  patternValue,
  patternMessage,
  inputStyle,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        className={inputStyle}
        type={type}
        {...register(name, {
          required: required,
          minLength: minLength,
          maxLength: maxLength,
          pattern: {
            value: patternValue,
            message: patternMessage,
          },
        })}
      />
      <p>{errors[name]?.message}</p>
    </div>
  );
}
