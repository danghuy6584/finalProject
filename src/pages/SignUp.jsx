import React from "react";
import { useState } from "react";
import { supabase } from '@/config/supabaseClient'
import { useEffect } from "react";

function SignUp() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
//   useEffect(() => {
//     // Define an async function inside useEffect
//     async function fetchData() {
//       try {
        
// let { data: menuCoffe, error } = await supabase
// .from('menuCoffe')
// .select('*')
        
//         console.log(menuCoffe)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } 
//     }

//     fetchData();
//   }, []);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    let flag = true;
    let xx = 1;
    if (inputs.name == "") {
        flag = false;
        xx = 2;
      }
    if (inputs.email == "") {
      flag = false;
      xx = 2;
    }
    if (inputs.password == "") {
      flag = false;
      xx = 2;
    }
  
        let { data, error } = await supabase.auth.signUp({
            email: 'someone@email.com',
            password: 'OwWSlgvnQlUCpOGcuvwZ'
        })
        console.log(data)
    //   try {
    //     let { data, error } = await supabase.auth.signUp({
    //         email: inputs.name,
    //         password: inputs.password,
    //         // name: inputs.name,
    //       })
    //     console.log(data)
    //     console.log(error)
    //     alert("check your email")
    //   } catch (error) {
    //     alert(error)
    //   }
 
  };
  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #FEF3E2 , #8F8677)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage:
                'url("../../public/image/pngtree-coffee-drink-drink-mellow-picture-image_2390027.jpg")',
            }}
          >
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac{" "}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12 bg-[#FFFDEF]">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only take a minute
            </p>
            <form action="#">
              <div className="mt-5">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-400 py-1 px-2 w-full"
                  onChange={handleInput}
                />
              </div>
              <div className="mt-5">
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  onChange={handleInput}
                />
              </div>
              <div className="mt-5">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  onChange={handleInput}
                />
              </div>
              <div className="mt-5">
                <input type="checkbox" className="border border-gray-400" />
                <span>
                  I accept the{" "}
                  <a href="#" className="text-[#9E6F21] font-semibold">
                    Terms of Use
                  </a>{" "}
                  &amp;{" "}
                  <a href="#" className="text-[#9E6F21] font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="mt-5">
                <button className="w-full bg-[#9E6F21] py-3 text-center text-white" onClick={handleSignUp}>
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
