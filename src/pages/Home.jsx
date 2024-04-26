import Banner from "@/component/Banner";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import { Outlet } from "react-router-dom";


export function Home() {
  return (
    <>
    <Header/>
    
    <Banner/>
    <Outlet/>
    <Footer/>
    </>
  );
}
export default Home;
