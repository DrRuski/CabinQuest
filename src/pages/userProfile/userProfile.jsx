import { useContext } from "react";
import { UserContext } from "../../context/context";
import UserAvatar from "./avatar/avatar";
import UserInformation from "./information/information";

export default function UserProfile() {
  const { userData, setUserData } = useContext(UserContext);
  document.title = `${userData.name}`;

  return (
    <section className="container mx-auto h-screen px-3 md:px-0">
      <div className="flex">
        <div className="flex flex-col gap-2 items-center p-2 md:p-6 shadow-xl border rounded border-border md:w-[400px]">
          <UserAvatar userData={userData} setUserData={setUserData} />
          <UserInformation userData={userData} setUserData={setUserData} />
        </div>
      </div>
    </section>
  );
}
