import Form from "../../components/form/form";
import FormInput from "../../components/form/formInput";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Registration() {
  const [authenticated, setAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setAuthenticated(true);
    reset();
    console.log(JSON.stringify(data, null, 2));
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
          name="username"
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
