import { useContext } from "react";
import { UserContext } from "../../App";
import Form from "../../components/common/form/form";
import { useForm } from "react-hook-form";
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
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createVenueHeader(data, userData.accessToken);

      console.log(await response.json());
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
        <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <FormInput
            label="Username"
            type="text"
            register={register}
            name="name"
            errors={errors}
            className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
          />
        </Form>
      </div>
    </section>
  );
}
