import Banner from "@/component/Banner/Banner";
import Footer from "@/component/Layout/Footer";
import Header from "@/component/Layout/Header";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}
export default Home;
