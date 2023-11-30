import { Outlet } from "react-router-dom";
import Header from "../common/header/header";
import Footer from "../common/footer/footer";

export default function Layout() {
  return (
    <div className="flex flex-col gap-[25px] lg:gap-[50px]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
