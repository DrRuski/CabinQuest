import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import UserAvatar from "./avatar/avatar";
import UserInformation from "./information/information";
import UserBookings from "./bookings/bookings";
import Loader from "../../misc/loader";

export default function UserProfile() {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  document.title = `${userData.name}`;

  return (
    <section className="container mx-auto h-full px-3 md:px-0">
      <div className="flex flex-col lg:flex-row gap-7 lg:gap-14">
        <div className="flex flex-col gap-2 items-center p-2 md:p-6 shadow-xl border rounded border-border md:w-[450px]">
          {isLoading ? (
            <Loader />
          ) : (
            <UserAvatar
              userData={userData}
              setUserData={setUserData}
              setIsLoading={setIsLoading}
            />
          )}
          <UserInformation userData={userData} setUserData={setUserData} />
        </div>
        <UserBookings userData={userData} />
      </div>
    </section>
  );
}
