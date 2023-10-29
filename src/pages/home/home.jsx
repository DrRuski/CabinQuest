import PropTypes from "prop-types";
import Loader from "../../misc/loader";
import Form from "../../components/common/form/form";
import FormInput from "../../components/common/form/formInput";
import { useForm } from "react-hook-form";

Home.propTypes = {
  venueData: PropTypes.array,
  isLoading: PropTypes.bool,
};

Hero.propTypes = {
  venueData: PropTypes.array,
};

export default function Home({ venueData, isLoading }) {
  document.title = "Home";
  return (
    <section className="flex flex-col gap-16 h-screen">
      {isLoading ? <Loader /> : <Hero venueData={venueData} />}
    </section>
  );
}

function Hero({ venueData }) {
  return (
    <>
      <div className="heroGradient absolute w-full h-[435px] z-0"></div>
      <div className="flex flex-col">
        <div className="flex items-center justify-around z-50 container mx-auto">
          <div className="flex flex-col md:w-[450px]">
            <h1 className="font-heading font-bold text-5xl">
              Pristine, quite and peaceful.
            </h1>
            <p>
              Antepuska relölig. Ede aväv. Sonade pogåpägon bejånar. Kroliga.
              Spenihet ar. Konnetik. Geofans besam, agnostisofi. Sest kror utan
              löluska. Plaras anteska ifall egost. Kad peda. Egånt osa inte
              växtbaserat kött. Poledes dilire och glokal.
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-2 w-[450px]">
            {venueData?.slice(0, 6).map((image) => (
              <li key={image.id}>
                <img
                  className="aspect-square object-cover rounded shadow"
                  src={image.media}
                  alt={image.name}
                />
              </li>
            ))}
          </ul>
        </div>
        <VenueSearch />
      </div>
    </>
  );
}

function VenueSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    reset();
  };
  return (
    <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <FormInput
        label="Search"
        type="text"
        register={register}
        name="venue"
        errors={errors}
        className="ps-2 rounded shadow h-8 outline-none focus:shadow-md focus:shadow-primary hover:shadow-primary"
      />
    </Form>
  );
}
