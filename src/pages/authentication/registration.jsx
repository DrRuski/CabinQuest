import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../../components/form/form";
import FormInput from "../../components/form/formInput";
import { API_BASE_URL } from "../../data/url/apiBaseURL";

export default function Registration() {
  const [authenticated, setAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setAuthenticated(true);
    try {
      const response = await fetch(`${API_BASE_URL}/holidaze/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      return await response.json();
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
        Tell us a bit about yourself.
      </h1>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          register={register}
          name="name"
          errors={errors}
          className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:border"
        />

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

        <input
          type="submit"
          value={authenticated ? "Creating Account..." : "Create Account"}
          className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-secondary hover:text-text cursor-pointer"
        />
      </Form>
    </div>
  );
}
