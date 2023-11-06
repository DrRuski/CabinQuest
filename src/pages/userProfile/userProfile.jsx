import { useContext } from "react";
import { UserContext } from "../../context/context";

export default function UserProfile() {
  const { userData } = useContext(UserContext);
  document.title = `${userData.name}`;
  return (
    <main className="flex flex-col gap-16 h-screen">
      Welcome to User Profile Page
    </main>
  );
}
