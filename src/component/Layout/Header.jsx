import React, { useState } from "react";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
import { Drawer, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
import { supabase } from "@/config/supabaseClient";
import { useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

function Header() {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "PROFILE", link: "/" },
  ];
  const stripe = useStripe();
  const cart = useSelector((state) => state.cart);
  let [open, setOpen] = useState(false);
  const [openRight, setOpenRight] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setDataUser(user);
          setIsLoading(false);
          setIsLoggedIn(true);
        }
        const total = cart.reduce((acc, item) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity);
          return acc + price * quantity;
        }, 0);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const handleCheckout = async () => {
    const { data: order, error } = await supabase
      .from("order")
      .insert([{ user_id: dataUser.id }])
      .select();
    if (order) {
      const orderId = order[0].id;
      const dataOrder = cart.map((item) => ({
        menu_id: item._id,
        quantity: item.quantity,
        order_id: orderId,
      }));
      console.log(dataOrder);
      const { data, error } = await supabase
        .from("orderDetail")
        .insert(dataOrder)
        .select();
      console.log(data, error);
    }
    // const { data, error } = await supabase.functions.invoke("stripe", {
    //   body: {
    //     products: cart,
    //   },
    // });
    // console.log(data);
    // if (data) {
    //   const test = await stripe.redirectToCheckout({
    //     sessionId: data.id,
    //   });
    //   console.log("🚀 ~ handleAddToCart ~ test:", test);
    // }
    // if (error) {
    //   console.error("🚀 ~ handleAddToCart ~ error:", error);
    // }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Event handler for increment button
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-[99]">
      <div className="md:flex items-center justify-between bg-[#447878] py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <div className="w-7 h-7">
            <img src="../../public/image/espresso (1).png" alt="logo" />
          </div>
          <span className="ml-3 text-white">Coffee</span>
        </div>
        <div className="absolute right-24 top-5 cursor-pointer md:hidden w-5 h-5">
          <button
            onClick={openDrawerRight}
            className="btn bg-white text-[#447878] md:ml-8 font-semibold px-3 py-1 rounded duration-500 relative "
          >
            <BellAlertIcon class="h-5 w-5 text-gray-500" />
            <span className="absolute bottom-4 left-8 text-white z-[2] rounded-full bg-[#A34343] w-5 h-5">
              {cart.length}
            </span>
          </button>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-5 top-5  cursor-pointer md:hidden w-7 h-7"
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
          <li className="md:ml-8 md:my-0 my-7 font-semibold hidden md:block">
            <button
              onClick={openDrawerRight}
              className="btn bg-white text-[#447878] md:ml-8 font-semibold px-3 py-1 rounded duration-500 relative "
            >
              <BellAlertIcon class="h-6 w-6 text-gray-500" />
              <span className="absolute bottom-4 left-10 text-white z-[2] rounded-full bg-[#A34343] w-6 h-6">
                {cart.length}
              </span>
            </button>
          </li>

          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            {isLoading ? (
              <p>Loading...</p>
            ) : isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn bg-white text-[#447878] md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to={"/Login"}
                className="btn bg-white text-[#447878] md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              >
                LOGIN
              </Link>
            )}
          </li>
        </ul>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 "
        size={300}
      >
        <Typography
          className="border-b-[1px] border-black"
          variant="h5"
          color="blue-gray"
        >
          Gio hang
        </Typography>
        <div className="mb-6 flex text-left h-2/3 overflow-y-auto border-b-[1px] border-gray-500">
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li
                key={index}
                className="py-4 flex border-b-[1px] border-gray-300"
              >
                <div className="flex-shrink-0 w-24 h-24">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1 flex flex-col border-b-[1px]">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price}
                    </p>
                  </div>
                  <div className="">
                    <label
                      for="quantity-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose quantity:
                    </label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        onClick={handleDecrement}
                        data-input-counter-decrement="quantity-input"
                        className="bg-gray-100 hover:bg-gray-300 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="quantity-input"
                        data-input-counter
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={quantity}
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        onClick={handleIncrement}
                        data-input-counter-increment="quantity-input"
                        className="bg-gray-100 hover:bg-gray-300 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="checkout w-full">
          <h3 className="float-left">
            Total : <span className="float-right">{total}$</span>
          </h3>
          <button
            type="button"
            onClick={handleCheckout}
            className="w-full text-center  text-white bg-[#f48220] hover:bg-[#f48220]/90 focus:ring-4 focus:outline-none focus:ring-[#f48220]/50 font-medium rounded-lg text-sm px-5 py-2.5  items-center dark:focus:ring-[#f48220]/50 me-2 mb-2"
          >
            CHECK OUT
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
