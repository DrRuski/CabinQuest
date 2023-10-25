import Form from "../../components/form/form";
import FormInput from "../../components/form/formInput";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

import { API_BASE_URL } from "../../data/url/apiBaseURL";

export default function Login() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setAuthenticated(true);
    try {
      const response = await fetch(`${API_BASE_URL}/holidaze/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      const responseData = await response.json();
      setUserData(responseData);
    } catch (error) {
      console.error(error.message);
    }
    reset();
    setTimeout(() => {
      setAuthenticated(false);
    }, 3000);
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
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:border"
        />

        <FormInput
          label="Password"
          type="password"
          register={register}
          name="password"
          errors={errors}
          className="ps-2 rounded shadow h-8 outline-none"
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
