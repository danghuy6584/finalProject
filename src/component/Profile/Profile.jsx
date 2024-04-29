import React, { useEffect, useState } from "react";
import { supabase } from "@/config/supabaseClient";
const Profile = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setDataUser(user);
        if (user) {
          const { data, error } = await supabase
            .from("order")
            .select(`*`)
            .eq("user_id", user.id);
          if (data) {
            const { data: orderDetail, error } = await supabase
              .from("orderDetail")
              .select(
                `
            created_at,
            id,
            menu_id (
              name,
              price
            ),
            quantity
          `
              )
              .eq("order_id", data[0].id);
            console.log(orderDetail, error);
            setDataOrder(orderDetail);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const formatDate = (date) => {
    // Format date to dd/mm/yyyy & hh:mm:ss
    const d = new Date(date);
    const formattedDate = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div className="w-full text-white bg-main-color">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {dataUser &&
                  dataUser.user_metadata &&
                  dataUser.user_metadata.full_name}
              </h1>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {dataUser.email}
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      {dataUser.aud}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {formatDate(dataUser.created_at)}
                  </span>
                </li>
                <li className="flex items-center py-3 text-center ">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>
            <div className="my-4" />
          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="tracking-wide">List order</span>
              </div>
              <div className="text-gray-700">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  {dataOrder.map((order) => (
                    <li key={order.id} className="py-4">
                      <div className="flex space-x-3">
                        <div className="flex-1 truncate">
                          <p className="text-gray-900 dark:text-white text-sm truncate">
                            {order.menu_id.name}
                          </p>
                        </div>
                        <div className="flex-1 truncate">
                          <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
                            {order.quantity} x {order.menu_id.price} $
                          </p>
                        </div>
                        <p className="text-gray-900 dark:text-white text-base">
                          Amount : {order.quantity * order.menu_id.price} $
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* End of about section */}
            <div className="my-4" />
            {/* Experience and education */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
