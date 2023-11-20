import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faParking,
  faPaw,
  faTrashCan,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

FormPageOTwo.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  fields: PropTypes.array,
  append: PropTypes.func,
  remove: PropTypes.func,
};

export default function FormPageOTwo({
  register,
  errors,
  fields,
  remove,
  append,
}) {
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  return (
    <>
      <h3 className="font-heading font-semiBold text-xl text-center">
        Venue Commodities and Media
      </h3>

      <div className="flex flex-col gap-1">
        <h4 className="font-semiBold">Commodities</h4>
        <div className="grid grid-cols-2 gap-5 rounded p-5 shadow-md">
          <label
            className={`flex  items-center justify-center rounded cursor-pointer p-2 ${
              wifi ? "bg-primary text-buttonText font-semiBold" : "bg-border"
            }`}
            htmlFor="wifi"
          >
            <FontAwesomeIcon icon={faWifi} /> <span className="ms-2">Wifi</span>
            <input
              id="wifi"
              type="checkbox"
              {...register("wifi")}
              checked={wifi}
              onChange={() => setWifi((prev) => !prev)}
              name="wifi"
              className="hidden"
            />
          </label>

          <label
            className={`flex  items-center justify-center rounded cursor-pointer p-2 ${
              parking ? "bg-primary text-buttonText font-semiBold" : "bg-border"
            }`}
            htmlFor="parking"
          >
            <FontAwesomeIcon icon={faParking} />{" "}
            <span className="ms-2">Parking</span>
            <input
              id="parking"
              type="checkbox"
              {...register("parking")}
              checked={parking}
              onChange={() => setParking((prev) => !prev)}
              name="parking"
              className="hidden"
            />
          </label>

          <label
            className={`flex  items-center justify-center rounded cursor-pointer p-2 ${
              pets ? "bg-primary text-buttonText font-semiBold" : "bg-border"
            }`}
            htmlFor="pets"
          >
            <FontAwesomeIcon icon={faPaw} /> <span className="ms-2">Pets</span>
            <input
              id="pets"
              type="checkbox"
              {...register("pets")}
              checked={pets}
              onChange={() => setPets((prev) => !prev)}
              name="pets"
              className="hidden"
            />
          </label>

          <label
            className={`flex  items-center justify-center rounded cursor-pointer p-2 ${
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
              {...register("breakfast")}
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
              name="breakfast"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <ul className="flex flex-col">
        {fields.map((field, index) => {
          return (
            <li className="flex flex-col gap-1" key={field.id}>
              <label className="font-semiBold">
                <span>Media #{index + 1}</span>
              </label>
              <div className="flex justify-between items-center gap-2">
                <input
                  key={field.id}
                  type="url"
                  {...register(`media.${index}`)}
                  className="ps-2 rounded h-10 outline-primary focus:shadow-md border border-border w-full"
                />
                <button
                  onClick={() => {
                    remove(index);
                  }}
                  type="button"
                  className="flex justify-center items-center gap-3 shadow-md rounded px-2 h-10 bg-secondary text-text hover:bg-accent hover:text-buttonText"
                >
                  <FontAwesomeIcon icon={faTrashCan} /> <span>Remove</span>
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
        className="flex justify-center items-center gap-3 shadow-md rounded bg-primary p-3 text-buttonText hover:bg-accent"
      >
        Add Image
      </button>
    </>
  );
}
