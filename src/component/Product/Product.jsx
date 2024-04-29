import React, { useEffect, useState } from "react";
import { supabase } from "@/config/supabaseClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

function Product() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        let { data: menuCoffe, error } = await supabase
          .from("menuCoffe")
          .select("*");
        setData(menuCoffe);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full gap-4 min-h-[400px] flex-wrap flex justify-center items-center  max-[1072px]:mt-12 z-0">
        <div className="w-full font-mono text-8xl">MENU</div>
        {data.map((data) => (
          <div
            key={data.id}
            className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl "
          >
            <img
              className="h-40 object-cover rounded-xl"
              src={data.image}
              alt=""
            />
            <div className="p-2">
              <h2 className="font-bold text-lg mb-2 ">{data.name}</h2>
              <p className="text-sm text-gray-600">{data.description}</p>
              <p className="text-sm text-gray-900 font-bold">{data.price} $</p>
            </div>
            <div className="m-2 gap-4">
              <button
                onClick={() => dispatch(addToCart(data))}
                className="text-white bg-[#779977] px-3 py-1 rounded-md hover:bg-[#4B2C34]"
              >
                Add to card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
