import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../../components/common/form/form";
import FormInput from "../../components/common/form/formInput";
import { authFetchHeader } from "../../data/fetchHeaders/authFetchHead";
import PropTypes from "prop-types";

Registration.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default function Registration({ setIsOpen }) {
  const [authenticated, setAuthenticated] = useState(false);
  const registerEndpoint = "/holidaze/auth/register";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authFetchHeader(data, registerEndpoint);

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.message);
        throw new Error("Registration failed:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error.message);
      throw new Error("Network error:", error.message);
    } finally {
      setAuthenticated(true);
      reset();
      setTimeout(() => {
        setAuthenticated(false);
        setIsOpen(true);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-heading text-xl font-semiBold">
        Tell us a bit about yourself.
      </h1>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
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
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
        />

        <input
          type="submit"
          value={authenticated ? "Creating Account..." : "Create Account"}
          className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-secondary hover:text-text cursor-pointer"
        />
      </Form>
    </div>
  );
}
