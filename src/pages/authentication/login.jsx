import Form from "../../components/form/form";
import FormInput from "../../components/form/formInput";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

import { useNavigate } from "react-router-dom";
import { authFetchHead } from "../../data/authentication/authFetchHead";

export default function Login() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setUserData } = useContext(UserContext);
  const loginEndpoint = "/holidaze/auth/login";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authFetchHead(data, loginEndpoint);
      if (response.ok) {
        const responseData = await response.json();
        setUserData(responseData);
        setAuthenticated(true);
        reset();
        setTimeout(() => {
          setAuthenticated(false);
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        throw new Error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error.message);
      throw new Error("Network error:", error.message);
    } finally {
      navigate("/home");
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-heading text-xl font-semiBold">
        Please provide your login details.
      </h1>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          register={register}
          name="email"
          errors={errors}
          patternValue={/^[\w\-.]+@(stud\.)?noroff\.no$/}
          patternMessage="Your email is invalid. - Only stud.noroff.no emails are valid."
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />

        <FormInput
          label="Password"
          type="password"
          register={register}
          name="password"
          errors={errors}
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />
        <a
          className="text-sm underline opacity-50 hover:text-link w-fit"
          href="#"
        >
          Forgot Password?
        </a>

        <input
          type="submit"
          value={authenticated ? "Redirecting..." : "Login"}
          className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-secondary hover:text-text cursor-pointer"
        />
      </Form>
    </div>
  );
}
