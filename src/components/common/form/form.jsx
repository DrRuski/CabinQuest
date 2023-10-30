import PropTypes from "prop-types";

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default function Form({ children, onSubmit, handleSubmit, className }) {
  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}
