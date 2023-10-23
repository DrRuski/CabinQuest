import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "./formInput";

export default function Form() {
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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email"
        type="email"
        register={register}
        name="email"
        errors={errors}
        patternValue="/^[\w\-.]+@(stud\.)?noroff\.no$/"
      />

      <FormInput
        label="Password"
        type="password"
        register={register}
        name="password"
        errors={errors}
      />

      <input
        type="submit"
        value={authenticated ? "Redirecting..." : "Login"}
        className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:shadow-primary hover:shadow-2xl"
      />
    </form>
  );
}
