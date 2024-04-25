import React, { useEffect } from "react";
import { supabase } from "@/config/supabaseClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function Product() {
  useEffect(() => {
    async function fetchData() {
      try {
        let { data: menuCoffe, error } = await supabase
          .from("menuCoffe")
          .select("*");
        console.log(menuCoffe);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const dispatch = useDispatch();

  const mockData = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      price: 10,
      image:
        "https://file.hstatic.net/1000075078/article/blog_f80b599183c340bca744c174e7ab2af8.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      price: 15,
      image:
        "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
      quantity: 1,
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      price: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRup_YySj8ek4UuJcy9ZTshMGy86ykj2ILjn34F4acf1A&s",
      quantity: 1,
    },
    {
      id: 4,
      name: "Product 3",
      description: "Description of Product 3",
      price: 20,
      image:
        "https://recipes.net/wp-content/uploads/2020/05/cinnamon-caramel-iced-coffee-recipes.jpg",
      quantity: 1,
    },
  ];
  return (
    <div>
      <div className="w-full gap-4 min-h-[400px] flex-wrap flex justify-center items-center  max-[1072px]:mt-12 z-0">
        <div className="w-full font-mono text-8xl">MENU</div>
        {mockData.map((data) => (
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
