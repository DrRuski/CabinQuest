import { NavLink } from "react-router-dom";

export default function SignInButton() {
  return (
    <div>
      <NavLink
        to="login"
        className="flex justify-center items-center py-2 px-7 rounded bg-primary shadow text-buttonText font-bold hover:bg-accent"
      >
        <span>Sign In</span>
      </NavLink>
    </div>
  );
}
