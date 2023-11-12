import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function SignInButton() {
  return (
    <div>
      <NavLink
        to="login"
        className="flex justify-center items-center gap-3 py-2 px-7 rounded bg-primary shadow text-buttonText font-bold hover:bg-accent"
      >
        <FontAwesomeIcon icon={faUnlockKeyhole} size="sm" />
        <span>Sign In</span>
      </NavLink>
    </div>
  );
}
