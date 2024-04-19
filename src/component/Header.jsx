import React, { useState } from "react";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
function Header() {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-[99]">
      <div className="md:flex items-center justify-between bg-[#447878] py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <div className="w-7 h-7">
            <img src="../../public/image/espresso (1).png" alt="logo" />
          </div>
          <span className="ml-3 text-white">Coffee</span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? (
            <XMarkIcon className="text-white" />
          ) : (
            <Bars3BottomRightIcon className="text-white" />
          )}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-10 z-[10] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12 bg-[#447878]" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href={link.link}
                className="text-white hover:text-blue-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <Link
            to={"/"}
            className="btn bg-white text-[#447878] md:ml-8 font-semibold px-3 py-1 rounded duration-500 relative z-[1] "
          >
            <BellAlertIcon class="h-6 w-6 text-gray-500" />
            <a className="absolute bottom-4 left-10 text-white z-[2] rounded-full bg-[#A34343] w-6 h-6">2</a>
          </Link>
          <Link
            to={"/Login"}
            className="btn bg-white text-[#447878] md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
          >
            LOGIN
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
