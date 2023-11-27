import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../../components/common/form/form";
import FormInput from "../../components/common/form/formInput";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../data/url/url";
import { postData } from "../../data/headers/postData";

Registration.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default function Registration({ setIsOpen }) {
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (userInput) => {
    try {
      const response = await postData(
        `${API_BASE_URL}/holidaze/auth/register`,
        null,
        userInput
      );

      if (response.ok) {
        setAuthenticated(true);
        reset();
        setTimeout(() => {
          setAuthenticated(false);
          setIsOpen(true);
        }, 3000);
        return await response.json();
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
        Tell us a bit about yourself.
      </h1>
      <Form
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <FormInput
          label="Username"
          type="text"
          register={register}
          name="name"
          errors={errors}
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />

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
          minLength={8}
          minLengthMessage="Password must be at least 8 characters long."
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />

        <input
          type="submit"
          value={
            error
              ? error[0].message
              : `${authenticated ? "Creating Account..." : "Create Account"}`
          }
          className={
            error
              ? `rounded p-2 text-buttonText font-normal cursor-pointer bg-error`
              : `rounded p-2 text-buttonText font-normal cursor-pointer ${
                  authenticated
                    ? "bg-accent shadow-lg shadow-primary"
                    : "bg-primary shadow-md hover:bg-accent"
                }`
          }
        />
      </Form>
    </div>
  );
}
