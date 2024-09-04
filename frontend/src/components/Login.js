import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import noteBookLogo from "../assets/image/builtIn/noteBookLogo.png";
import noteBookLogoDark from "../assets/image/builtIn/noteBookLogoDark.png";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Login(props) {
  // logo
  const [logo, setLogo] = useState();
  useEffect(() => {
    props.darkMode ? setLogo(noteBookLogoDark) : setLogo(noteBookLogo);
  }, [props.darkMode]);

  //api call
  const localHost = "http://localhost:5000";
  let navigate = useNavigate();
  const [state, setstate] = useState({ email: "", password: "" });
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${localHost}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });
      // if (!response.ok) {
      //   console.log("error");
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      const data = await response.json();
      if (data.allRight === true) {
        localStorage.setItem("authToken", data.authToken);
        props.showAlert("success", "you have successfully login");
        setEmail(false);
        setPassword(false);
        navigate("/");
      } else {
        if (data.email) {
          props.showAlert("error", data.email);
          setEmail(true);
        } else if (data.password) {
          props.showAlert("error", data.password);
          setEmail(false);
          setPassword(true);
        } else {
          props.showAlert("error", data.errors);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onchange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section>
        {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-white">
          <body className="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={signIn}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onChange={onchange}
                    className={`block w-full rounded-md border-0 py-1.5 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset focus:outline-none  placeholder:text-gray-400 dark:placeholder:text-gray-200 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-10 pr-4 md:text-lg ${
                      email
                        ? "ring-red-700 focus:ring-indigo-600 dark:focus:ring-green-950"
                        : "focus:ring-indigo-600 dark:focus:ring-green-950 dark:ring-gray-600 ring-gray-300 "
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-200"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="/"
                      className="font-semibold dark:text-green-600 dark:hover:text-green-500 text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 47 47"
                      fill="currentColor"
                    >
                      <g xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.517,16.514V9.597c0-5.294-4.304-9.596-9.595-9.597v1.666l-1.414,3.367c0.449-0.14,0.917-0.236,1.412-0.236    c2.641,0,4.793,2.156,4.793,4.8v6.917h-4.791v2.094l1.938,1.896l-5.109,5.418l2.722,5.938l-1.847,2.869l6.352,2.614l-4.579,3.599    l0.474,4.605h14.566V16.514H35.517z" />
                        <path d="M18.779,36.182l1.848-2.869l-2.722-5.938l5.109-5.418l-1.938-1.896v-2.093h-4.794v-6.917c0-2.149,1.429-3.955,3.38-4.563    l1.414-3.368V1.453c0,0-0.001,0-0.002,0c-5.29,0-9.594,4.303-9.594,9.598v6.917h-4.92V47h14.467l-0.474-4.605l4.577-3.599    L18.779,36.182z" />
                      </g>
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={onchange}
                    className={`block w-full rounded-md border-0 py-1.5 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset focus:outline-none  placeholder:text-gray-400 dark:placeholder:text-gray-200 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-10 pr-4 md:text-lg ${
                      password
                        ? "ring-red-700 focus:ring-indigo-600 dark:focus:ring-green-950"
                        : "focus:ring-indigo-600 dark:focus:ring-green-950 dark:ring-gray-600 ring-gray-300 "
                    }`}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-green-600 hover:tracking-widest"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 dark:text-green-600 dark:hover:text-green-500 text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
