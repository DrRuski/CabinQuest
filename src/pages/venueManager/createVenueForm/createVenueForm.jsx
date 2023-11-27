import Form from "../../../components/common/form/form";
import PropTypes from "prop-types";
import { useFieldArray, useForm } from "react-hook-form";
import { postData } from "../../../data/headers/postData";
import { API_BASE_URL, VENUES_ENDPOINT } from "../../../data/url/url";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faParking,
  faPaw,
  faTrashCan,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

import FormInput from "../../../components/common/form/formInput";
import FormTextArea from "../../../components/common/form/formTextArea";

CreateVenueForm.propTypes = {
  userData: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  setCreateOpen: PropTypes.func,
  setData: PropTypes.func,
};

export default function CreateVenueForm({ setData, userData, setCreateOpen }) {
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      media: [],
      location: {
        city: "",
        address: "",
        country: "",
        zip: "",
        continent: "",
        lat: Number,
        lng: Number,
      },
      meta: {
        wifi: wifi,
        parking: parking,
        pets: pets,
        breakfast: breakfast,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "media" });

  const onSubmit = async (userInput) => {
    try {
      const response = await postData(
        `${API_BASE_URL}${VENUES_ENDPOINT}`,
        userData.accessToken,
        userInput
      );

      if (response.ok) {
        const newVenue = await response.json();
        reset();
        setCreateOpen(false);
        setData((prevVenues) => [...prevVenues, newVenue]);
      } else {
        console.log(response);
        throw new Error("Error Description", response.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error Description", error);
    }
  };

  return (
    <div className="rounded bg-background shadow-lg lg:w-[850px] p-5 z-50 absolute left-0 right-0 m-auto">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="font-heading md:text-2xl font-bold">Create Venue</h1>
          <button onClick={() => setCreateOpen((open) => !open)}>❌</button>
        </div>
        <hr className="border border-border" />
        <Form
          className="flex flex-col gap-10"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <FormInput
              label="Venue Title"
              type="text"
              register={register}
              name="name"
              errors={errors}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />

            <FormTextArea
              placeholder="Write the venues description..."
              rows={5}
              label="Venue Description"
              type="text"
              register={register}
              name="description"
              errors={errors}
              className="p-2 rounded outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />

            <FormInput
              label="Price"
              type="number"
              register={register}
              name="price"
              errors={errors}
              inputmode="numeric"
              setValueAs={(value) => parseInt(value)}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />
            <FormInput
              label="Guest Count"
              type="number"
              register={register}
              name="maxGuests"
              errors={errors}
              inputmode="numeric"
              setValueAs={(value) => parseInt(value)}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Additional Details</h2>
              <hr className="border border-border" />
            </div>
            <h3 className="font-semiBold">Commodities</h3>
            <div className="grid grid-cols-2 gap-5 rounded p-5 shadow-md">
              <label
                className={`flex items-center justify-center rounded cursor-pointer p-2 ${
                  wifi
                    ? "bg-primary text-buttonText font-semiBold"
                    : "bg-border"
                }`}
                htmlFor="wifi"
              >
                <FontAwesomeIcon icon={faWifi} />{" "}
                <span className="ms-2">Wifi</span>
                <input
                  id="wifi"
                  type="checkbox"
                  {...register("meta.wifi")}
                  checked={wifi}
                  onClick={() => setWifi((prev) => !prev)}
                  className="hidden"
                />
              </label>

              <label
                className={`flex items-center justify-center rounded cursor-pointer p-2 ${
                  parking
                    ? "bg-primary text-buttonText font-semiBold"
                    : "bg-border"
                }`}
                htmlFor="parking"
              >
                <FontAwesomeIcon icon={faParking} />{" "}
                <span className="ms-2">Parking</span>
                <input
                  id="parking"
                  type="checkbox"
                  {...register("meta.parking")}
                  checked={parking}
                  onClick={() => setParking((prev) => !prev)}
                  className="hidden"
                />
              </label>

              <label
                className={`flex items-center justify-center rounded cursor-pointer p-2 ${
                  pets
                    ? "bg-primary text-buttonText font-semiBold"
                    : "bg-border"
                }`}
                htmlFor="pets"
              >
                <FontAwesomeIcon icon={faPaw} />{" "}
                <span className="ms-2">Pets</span>
                <input
                  id="pets"
                  type="checkbox"
                  {...register("meta.pets")}
                  checked={pets}
                  onClick={() => setPets((prev) => !prev)}
                  className="hidden"
                />
              </label>

              <label
                className={`flex items-center justify-center rounded cursor-pointer p-2 ${
                  breakfast
                    ? "bg-primary text-buttonText font-semiBold"
                    : "bg-border"
                }`}
                htmlFor="breakfast"
              >
                <FontAwesomeIcon icon={faBreadSlice} />{" "}
                <span className="ms-2">Breakfast</span>
                <input
                  id="breakfast"
                  type="checkbox"
                  {...register("meta.breakfast")}
                  checked={breakfast}
                  onClick={() => setBreakfast((prev) => !prev)}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <ul className="flex flex-col">
                {fields.map((field, index) => {
                  return (
                    <li className="flex flex-col gap-1" key={field.id}>
                      <label className="font-semiBold">
                        <span>Media #{index + 1}</span>
                      </label>
                      <div className="flex justify-between items-center gap-2 h-10">
                        <input
                          key={field.id}
                          type="text"
                          {...register(`media.${index}`)}
                          className="ps-2 rounded h-full outline-primary focus:shadow-md border border-border w-full"
                        />
                        <button
                          onClick={() => {
                            remove(index);
                          }}
                          type="button"
                          className="flex justify-center items-center gap-3 shadow rounded w-10 h-full p-1 md:p-3 bg-secondary text-text hover:bg-error hover:text-buttonText"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />{" "}
                        </button>
                      </div>
                      <span className="text-sm text-error">
                        {errors.media?.message}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={() => {
                  append("");
                }}
                type="button"
                className="shadow rounded bg-secondary p-2 text-text hover:bg-accent hover:text-buttonText"
              >
                Add Image
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Location</h2>
              <hr className="border border-border" />
            </div>

            <FormInput
              label="Address"
              type="text"
              register={register}
              name="location.address"
              errors={errors}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />
            <FormInput
              label="City"
              type="text"
              register={register}
              name="location.city"
              errors={errors}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />
            <FormInput
              label="Zip"
              type="text"
              register={register}
              name="location.zip"
              errors={errors}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />
            <FormInput
              label="Country"
              type="text"
              register={register}
              name="location.country"
              errors={errors}
              className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border"
              labelStyle="font-semiBold"
            />
          </div>

          <input
            type="submit"
            value="Publish Venue"
            className="flex justify-center items-center gap-3 shadow-md rounded bg-primary p-3 text-buttonText hover:bg-accent cursor-pointer"
          />
        </Form>
      </div>
    </div>
  );
}
