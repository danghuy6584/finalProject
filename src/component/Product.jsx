import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function Product() {
  return (
    <div>
      <div className="w-full gap-4 flex-wrap flex justify-center  max-[1072px]:mt-12 z-0">
        <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl z-[-1]">
          <img
            className="h-40 object-cover rounded-xl"
            src="https://file.hstatic.net/1000075078/article/blog_f80b599183c340bca744c174e7ab2af8.jpg"
            alt=""
          />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Heading</h2>
            <p className="text-sm text-gray-600">
              Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to
              our Youtube channel for more ...
            </p>
          </div>
          <div className="m-2">
            <a
              role="button"
              href="#"
              className="text-white bg-[#779977] px-3 py-1 rounded-md hover:bg-[#4B2C34]"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl z-[-1]">
          <img
            className="h-40 object-cover rounded-xl"
            src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
            alt=""
          />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Heading</h2>
            <p className="text-sm text-gray-600">
              Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to
              our Youtube channel for more ...
            </p>
          </div>
          <div className="m-2">
            <a
              role="button"
              href="#"
              className="text-white bg-[#779977] px-3 py-1 rounded-md hover:bg-[#4B2C34]"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl z-[-1]">
          <img
            className="h-40 object-cover rounded-xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRup_YySj8ek4UuJcy9ZTshMGy86ykj2ILjn34F4acf1A&s"
            alt=""
          />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Heading</h2>
            <p className="text-sm text-gray-600">
              Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to
              our Youtube channel for more ...
            </p>
          </div>
          <div className="m-2">
            <a
              role="button"
              href="#"
              className="text-white bg-[#779977] px-3 py-1 rounded-md hover:bg-[#4B2C34]"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl z-[-1]">
          <img
            className="h-40 object-cover rounded-xl"
            src="https://recipes.net/wp-content/uploads/2020/05/cinnamon-caramel-iced-coffee-recipes.jpg"
            alt=""
          />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Heading</h2>
            <p className="text-sm text-gray-600">
              Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to
              our Youtube channel for more ...
            </p>
          </div>
          <div className="m-2">
            <a
              role="button"
              href="#"
              className="text-white bg-[#779977] px-3 py-1 rounded-md hover:bg-[#4B2C34]"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
