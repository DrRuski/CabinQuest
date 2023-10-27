import PropTypes from "prop-types";

Home.propTypes = {
  children: PropTypes.node,
};

export default function Home({ children }) {
  document.title = "Home";
  return <main className="flex flex-col gap-16 h-screen">{children}</main>;
}
