import PropTypes from "prop-types";
import Form from "../../components/common/form/form";
import FormInput from "../../components/common/form/formInput";
import { useContext } from "react";
import { DataContext } from "../../App";
import { useForm } from "react-hook-form";
import {
  faCalendarAlt,
  faLocationDot,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

Hero.propTypes = {
  venueData: PropTypes.array,
};

HeroImageGrid.propTypes = {
  venueData: PropTypes.array,
};

VenueSearch.propTypes = {
  venueData: PropTypes.array,
};

export default function Hero() {
  return (
    <>
      <div className="heroGradient absolute w-full lg:h-[400px] z-0"></div>
      <div className="container mx-auto flex flex-col gap-[50px] z-40 items-center">
        <div className="flex items-center justify-between">
          <HeroDescriptionText />
          <HeroImageGrid />
        </div>
        <VenueSearch />
      </div>
    </>
  );
}

function HeroDescriptionText() {
  return (
    <div className="flex flex-col md:w-[475px]">
      <h1 className="font-heading font-bold text-4xl">
        Pristine, quite and peaceful.
      </h1>
      <p>
        Antepuska relölig. Ede aväv. Sonade pogåpägon bejånar. Kroliga. Spenihet
        ar. Konnetik. Geofans besam, agnostisofi. Sest kror utan löluska. Plaras
        anteska ifall egost. Kad peda. Egånt osa inte växtbaserat kött. Poledes
        dilire och glokal.
      </p>
    </div>
  );
}

function HeroImageGrid() {
  const { data } = useContext(DataContext);
  return (
    <ul className="grid grid-cols-3 gap-2 w-[475px]">
      {data.slice(0, 6).map((image) => (
        <li key={image.id}>
          <img
            className="aspect-square object-cover rounded shadow"
            src={image.media}
            alt={image.name}
          />
        </li>
      ))}
    </ul>
  );
}

function VenueSearch() {
  const { data } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userSearch) => {
    console.log(userSearch);
    const venueSearch = data.filter((venue) => {
      venue.location.country.toLowerCase().includes(data.country.toLowerCase());
    });
    console.log(venueSearch);
  };
  return (
    <Form
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="flex justify-between bg-background rounded lg:w-[950px] lg:h-[60px] shadow-md"
    >
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[50px] p-1">
          <FormInput
            icon={faLocationDot}
            label="Location"
            placeholder="Where are you going?"
            type="text"
            register={register}
            name="country"
            errors={errors}
            required=""
            className="rounded h-8 outline-none"
            inputContainerStyle="gap-0"
          />
          <div className="flex gap-4">
            <FormInput
              icon={faCalendarAlt}
              label="Check-in"
              type="date"
              register={register}
              name="dateFrom"
              errors={errors}
              required=""
              className="rounded h-8 outline-none"
              inputContainerStyle="gap-0"
            />
            <FormInput
              icon={faCalendarAlt}
              label="Check-out"
              type="date"
              register={register}
              name="dateTo"
              errors={errors}
              required=""
              className="rounded h-8 outline-none"
              inputContainerStyle="gap-0"
            />
          </div>
          <FormInput
            icon={faPeopleGroup}
            label="Guests"
            type="number"
            placeholder="How many guests?"
            register={register}
            name="guests"
            errors={errors}
            required=""
            className="rounded h-8 outline-none"
            setValueAs={(value) => parseInt(value)}
            inputContainerStyle="gap-0"
          />
        </div>
        <div className="flex gap-[25px]">
          <FormInput
            label="Wifi"
            labelStyle="text-sm md:text-base"
            type="checkbox"
            register={register}
            name="wifi"
            errors={errors}
            required=""
            className="rounded h-8 outline-none"
            inputContainerStyle="flex flex-row-reverse items-center gap-2"
          />
          <FormInput
            label="Breakfast"
            labelStyle="text-sm md:text-base"
            type="checkbox"
            register={register}
            name="breakfast"
            errors={errors}
            required=""
            className="rounded h-8 outline-none"
            inputContainerStyle="flex flex-row-reverse items-center gap-2"
          />
          <FormInput
            label="Parking"
            labelStyle="text-sm md:text-base"
            type="checkbox"
            register={register}
            name="parking"
            errors={errors}
            required=""
            className="rounded h-8 outline-none"
            inputContainerStyle="flex flex-row-reverse items-center gap-2"
          />
          <FormInput
            label="Pets"
            labelStyle="text-sm md:text-base"
            type="checkbox"
            register={register}
            name="pets"
            errors={errors}
            required=""
            className="rounded h-8 outline-none"
            inputContainerStyle="flex flex-row-reverse items-center gap-2"
          />
        </div>
      </div>
      <input
        type="submit"
        value="Search"
        className="rounded-e bg-primary w-full h-full text-buttonText font-normal hover:bg-accent hover:text-text cursor-pointer"
      />
    </Form>
  );
}
