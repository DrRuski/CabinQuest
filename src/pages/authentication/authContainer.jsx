import { useState } from "react";
import Login from "./login";
import Registration from "./registration";

export default function AuthContainer() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="container m-auto">
      <div className="flex h-screen">
        <div className="flex flex-col md:flex-row justify-center items-center shadow md:w-[800px] md:h-[500px] m-auto">
          <div className="flex flex-col justify-center items-center md:w-[400px] md:h-[500px] text-text">
            <AuthLogo />
          </div>

          <div className="flex flex-col items-center justify-between p-4 md:w-[400px] md:h-[500px]">
            <div className="flex gap-5 p-2 rounded-full shadow-inner bg-[#fefefe]">
              <button
                className={`p-1 px-5 shadow rounded-full ${
                  isOpen ? "bg-primary text-buttonText" : "hover:bg-secondary"
                }`}
                onClick={() => setIsOpen(true)}
              >
                Login
              </button>
              <button
                className={`p-1 px-5 shadow rounded-full ${
                  !isOpen ? "bg-primary text-buttonText" : "hover:bg-secondary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Register
              </button>
            </div>

            {isOpen ? <Login /> : <Registration setIsOpen={setIsOpen} />}

            <div className=" flex flex-col items-center gap-1 w-3/4">
              <div className="border-t w-[150px] opacity-20"></div>
              <p className="text-center text-sm">
                By signing in or creating an account, you agree with our{" "}
                <span>Terms & conditions</span> and{" "}
                <span>Privacy statement</span>
              </p>
              <div className="border-b w-[150px] opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthLogo() {
  return (
    <div className="flex flex-col items-center justify-center p-1 gap-2">
      <img
        className="object-cover aspect-square w-[200px]"
        src="src/assets/images/cabinQSvg.svg"
        alt=""
      />
      <h1 className="text-center font-heading font-semiBold">
        Welcome to CabinQuest, where every stay is an unforgettable chapter in
        your travel story.
      </h1>
    </div>
  );
}
