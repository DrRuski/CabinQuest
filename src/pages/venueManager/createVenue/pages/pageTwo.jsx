import PropTypes from "prop-types";
import FormInput from "../../../../components/common/form/formInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <>
      <h3 className="font-heading font-semiBold text-xl text-center">
        Venue Commodities and Media
      </h3>

      <div className="flex flex-col gap-1">
        <h4 className="font-semiBold">Commodities</h4>
        <div className="grid grid-cols-2 gap-5 p-2 rounded shadow-md">
          <FormInput
            label="Wifi"
            type="checkbox"
            register={register}
            name="wifi"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
          <FormInput
            label="Parking"
            type="checkbox"
            register={register}
            name="parking"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
          <FormInput
            label="Breakfast"
            type="checkbox"
            register={register}
            name="breakfast"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
          <FormInput
            label="Pets"
            type="checkbox"
            register={register}
            name="pets"
            errors={errors}
            className=""
            inputContainerStyle="flex justify-end flex-row-reverse gap-5"
          />
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
