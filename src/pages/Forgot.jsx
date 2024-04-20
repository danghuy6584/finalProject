import React from "react";
import { useState } from "react";
import { supabase } from "@/config/supabaseClient";

function Forgot() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  console.log(email);
  const handleForgot = async (e) => {
    e.preventDefault();
    console.log(email)
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
    try {
        const { data, error } = await supabase.auth
        .resetPasswordForEmail(email)      
      alert(error);
    } catch (error) {
      alert(error);
    }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold text-[#447878]">
            Forgot Password
          </h1>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Email</label>
              <input
                type="email"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#447878] rounded-xl text-white font-bold text-lg"
              onClick={handleForgot}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
