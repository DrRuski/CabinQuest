import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

FormInput.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  register: PropTypes.func,
  type: PropTypes.string,
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
  idKey: PropTypes.string,
  iconStyle: PropTypes.string,
};

export default function FormInput({
  children,
  label,
  labelStyle,
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
  idKey,
  iconStyle = "text-accent me-2",
}) {
  return (
    <div key={idKey} className={inputContainerStyle}>
      <label className={labelStyle} htmlFor={name}>
        <span>
          {icon && <FontAwesomeIcon className={iconStyle} icon={icon} />}
          {label}
        </span>
      </label>
      <input
        id={name}
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
      <span className="text-sm text-error">{errors[name]?.message}</span>
      {children && <div>{children}</div>}
    </div>
  );
}
