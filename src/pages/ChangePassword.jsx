import React from 'react'
import { useState } from 'react';
import { supabase } from "@/config/supabaseClient";
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs((state) => ({ ...state, [nameInput]: value }));
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!isValidEmail(inputs.email)) {
          setErrorMessage("Invalid email format");
          return;
        }
        if ( inputs.password =="") {
            setErrorMessage("fail");
            return;
          }
        try {
            await supabase.auth.refreshSession();
            const { data, error } = await supabase.auth.updateUser({
                email: inputs.email,
                password: inputs.password
              })
              navigate('/login');
          alert("oke");
        } catch (error) {
          alert(error);
        }
      };
    const isValidEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(e);
      };
  return (
<div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold text-[#447878]">
            Change Password
          </h1>
          <div className="mt-8">
          {errorMessage && <p>{errorMessage}</p>}
            <div className="flex flex-col">
              <label className="text-lg font-medium">Email</label>
              <input
                type="email"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
                name="email"
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium">Password</label>
              <input
                type="password"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password"
                name="password"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
            onClick={handleChangePassword}
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#447878] rounded-xl text-white font-bold text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>  )
}

export default ChangePassword