import { useContext } from "react";
import { UserContext } from "../../context/context";
import Form from "../../components/common/form/form";
import { useForm } from "react-hook-form";

import FormInput from "../../components/common/form/formInput";
import { postData } from "../../data/headers/postData";
import { API_BASE_URL, VENUES_ENDPOINT } from "../../data/url/url";

export default function VenueManagerDashboard() {
  const { userData } = useContext(UserContext);
  document.title = "Dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      media: [""],
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${VENUES_ENDPOINT}`,
        postData(data, userData.accessToken)
      );
      if (!response.ok) {
        console.log(response);
        return;
      }
      return await response.json();
    } catch (error) {
      console.error(error);
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

          <FormInput
            label="Price"
            type="number"
            register={register}
            name="price"
            errors={errors}
            setValueAs={(value) => parseInt(value)}
            className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
          />
          <FormInput
            label="Allowed Amount of Guests"
            type="number"
            register={register}
            name="maxGuests"
            errors={errors}
            setValueAs={(value) => parseInt(value)}
            className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
          />

          <FormInput
            label="Media"
            type="text"
            register={register}
            name="media.0"
            errors={errors}
            className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
          />

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
