import { useContext } from "react";
import { UserContext } from "../../App";
import Form from "../../components/common/form/form";
import { useFieldArray, useForm } from "react-hook-form";
import { createVenueHeader } from "../../data/fetchHeaders/createVenueHead";
import FormInput from "../../components/common/form/formInput";

export default function VenueManagerDashboard() {
  const { userData } = useContext(UserContext);
  document.title = "Dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const { fields, append, prepend, remove } = useFieldArray({ control });

  const onSubmit = async (data) => {
    try {
      const response = await createVenueHeader(data, userData.accessToken);

      console.log(data);
      if (response.ok) {
        // return await response.json();
      }
    } catch (error) {
      console.error("Network error:", error.message);
      throw new Error("Network error:", error.message);
    } finally {
      reset();
    }
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-16 h-screen">
        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        >
          <FormInput
            label="Venue Title"
            type="text"
            register={register}
            name="name"
            errors={errors}
            className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
          />

          <FormInput
            label="Venue Description"
            type="text"
            register={register}
            name="description"
            errors={errors}
            className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
          />

          {fields.map((field, index) => {
            console.log(field);
            return (
              <FormInput
                key={field.id}
                label="Media"
                type="text"
                register={register}
                name={`media.${index}`}
                errors={errors}
                className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
              />
            );
          })}
          <div className="flex gap-10">
            <button
              type="button"
              onClick={() => {
                append({ name: "Media" });
              }}
              className="shadow-md rounded bg-secondary p-2 text-text font-semiBold hover:bg-accent hover:text-text cursor-pointer"
            >
              Append
            </button>
            <button
              type="button"
              onClick={() => {
                prepend({ name: "Media" });
              }}
              className="shadow-md rounded bg-secondary p-2 text-text font-semiBold hover:bg-accent hover:text-text cursor-pointer"
            >
              Prepend
            </button>
            <button
              type="button"
              onClick={() => {
                remove();
              }}
              className="shadow-md rounded bg-secondary p-2 text-text font-semiBold hover:bg-accent hover:text-text cursor-pointer"
            >
              Remove
            </button>
          </div>

          <input
            type="submit"
            value="Create Venue"
            className="shadow-md rounded bg-primary p-2 text-buttonText font-normal hover:bg-accent hover:text-text hover:font-semiBold cursor-pointer"
          />
        </Form>
      </div>
    </section>
  );
}
