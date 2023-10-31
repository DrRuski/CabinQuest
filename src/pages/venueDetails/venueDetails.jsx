import { useContext } from "react";
import { UserContext } from "../../App";
import Loader from "../../misc/loader";
import useData from "../../data/read";

export default function VenueDetails() {
  const { userData } = useContext(UserContext);
  const { data, isLoading } = useData(userData);
  document.title = `${data.name}`;
  console.log(data);

  return (
    <section className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-16 h-screen">
          <h1>{data.name}</h1>
          <img
            className="object-fit w-[200px] h-[200px]"
            src={data.media}
            alt=""
          />
        </div>
      )}
    </section>
  );
}
