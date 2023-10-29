import PropTypes from "prop-types";

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.string,
  errors: PropTypes.object,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  patternValue: PropTypes.instanceOf(RegExp),
  patternMessage: PropTypes.string,
  className: PropTypes.string,
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
  className,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        className={className}
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
      <p className="text-sm text-error">{errors[name]?.message}</p>
    </div>
  );
}
