import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup(props) {
  const localHost = "https://notebook-backend-peef.onrender.com";
  let navigate = useNavigate();
  const [state, setstate] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${localHost}/api/auth/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password,
        }),
      });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      const data = await response.json();
      if (data.allRight) {
        localStorage.setItem("authToken", data.authToken);
        props.showAlert("success", "you have successfully create an account");
        setError(false);
        navigate("/");
      } else {
        props.showAlert("error", data.errors);
        setError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };
  const onchange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="flex flex-col justify-center items-center transition-all duration-1000 bg-signup-Light dark:bg-signup-Dark bg-cover bg-right">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700 backdrop-blur-sm">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              onSubmit={signup}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <g>
                        <path
                          className="st0"
                          d="M341.942,356.432c-20.705-12.637-28.134-11.364-28.134-36.612c0-8.837,0-25.256,0-40.403
		c11.364-12.62,15.497-11.049,25.107-60.597c19.433,0,18.174-25.248,27.34-47.644c7.471-18.238,1.213-25.632-5.08-28.654
		c5.144-66.462,5.144-112.236-70.292-126.436c-27.344-23.437-68.605-15.48-88.158-11.569c-19.536,3.911-37.159,0-37.159,0
		l3.356,31.49c-28.608,34.332-14.302,80.106-18.908,106.916c-6.002,3.27-11.416,10.809-4.269,28.253
		c9.165,22.396,7.906,47.644,27.34,47.644c9.61,49.548,13.742,47.977,25.107,60.597c0,15.147,0,31.566,0,40.403
		c0,25.248-8.581,25.683-28.133,36.612c-47.14,26.349-108.569,41.658-119.575,124.01C48.468,495.504,134.952,511.948,256,512
		c121.048-0.052,207.528-16.496,205.517-31.558C450.511,398.09,388.519,384.847,341.942,356.432z"
                        />
                      </g>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full pl-10 pr-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="Emelia Erickson"
                    required={true}
                    minLength={3}
                    onChange={onchange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <div className="relative">
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
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full pl-10 pr-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none ${
                      error
                        ? "border-red-800"
                        : "border-gray-300 dark:border-gray-600 "
                    } `}
                    placeholder="emailName@gmail.com"
                    required={true}
                    onChange={onchange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
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
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full pl-10 pr-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    required={true}
                    minLength={4}
                    onChange={onchange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 hover:tracking-widest"
              >
                { loading ? "Loading..." : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="font-medium text-blue-600 hover:underline dark:text-green-500"
                  to="/login"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
