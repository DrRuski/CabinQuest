import { API_BASE_URL } from "../../data/url/url";
import Form from "../../components/common/form/form";
import FormInput from "../../components/common/form/formInput";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { postData } from "../../data/headers/postData";

export default function Login() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (userInput) => {
    try {
      const response = await postData(
        `${API_BASE_URL}/holidaze/auth/login`,
        null,
        userInput
      );

      if (response.ok) {
        const result = await response.json();
        setUserData(result);
        setAuthenticated(true);
        reset();
        setTimeout(() => {
          setAuthenticated(false);
        }, 1000);
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.errors);
        setTimeout(() => {
          reset();
          setError(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Network error:", error.message);
      throw new Error("Network error:", error.message);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-heading text-xl font-semiBold">
        Please provide your login details.
      </h1>
      <Form
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
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

        <input
          type="submit"
          value={
            error
              ? error[0].message
              : `${authenticated ? "Redirecting..." : "Login"}`
          }
          className={
            error
              ? `rounded p-2 text-buttonText font-normal cursor-pointer bg-error`
              : `rounded p-2 text-buttonText font-normal cursor-pointer ${
                  authenticated
                    ? "bg-secondary shadow-lg shadow-primary"
                    : "bg-primary shadow-md hover:bg-accent"
                }`
          }
        />
      </Form>
    </div>
  );
}
