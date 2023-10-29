import PropTypes from "prop-types";

Home.propTypes = {
  children: PropTypes.node,
};

export default function Home({ children }) {
  document.title = "Home";
  return (
    <section className="flex flex-col gap-16 h-screen">{children}</section>
  );
}
