import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container m-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
