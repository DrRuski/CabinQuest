import { useContext } from "react";
import { UserContext } from "../../context/context";
import Loader from "../../misc/loader";
import useData from "../../data/read";

export default function VenueDetails() {
  const { userData } = useContext(UserContext);
  const { data, isLoading } = useData(userData);
  document.title = `${data.name}`;

  console.log(data);

  const handleImageError = (e) => {
    e.target.src = "/src/assets/images/imageNotFound.png";
  };

  return (
    <section className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-16 h-screen">
          <h1>{data.name}</h1>

          {data.media > 2 ? (
            <ul>
              {data.media.map((image, index) => (
                <li key={index}>
                  <img src={image} alt="" />
                </li>
              ))}
            </ul>
          ) : (
            <img
              className="object-fit w-[200px] h-[200px]"
              src={data.media}
              alt=""
              onError={handleImageError}
            />
          )}
        </div>
      )}
    </section>
  );
}
