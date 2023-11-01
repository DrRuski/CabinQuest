import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelStyle: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string,
  errors: PropTypes.object,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  patternValue: PropTypes.instanceOf(RegExp),
  patternMessage: PropTypes.string,
  className: PropTypes.string,
  inputContainerStyle: PropTypes.string,
  setValueAs: PropTypes.func,
  icon: PropTypes.object,
  key: PropTypes.string,
};

export default function FormInput({
  label,
  labelStyle = "flex flex-col",
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
  inputContainerStyle = "flex flex-col gap-1",
  setValueAs,
  placeholder,
  icon,
  key,
}) {
  return (
    <div key={key} className={inputContainerStyle}>
      <label className={labelStyle} htmlFor={name}>
        <span>
          {icon && <FontAwesomeIcon className="text-accent me-2" icon={icon} />}
          {label}
        </span>
        <input
          placeholder={placeholder}
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
            setValueAs: setValueAs,
          })}
        />
      </label>
      <p className="text-sm text-error">{errors[name]?.message}</p>
    </div>
  );
}
