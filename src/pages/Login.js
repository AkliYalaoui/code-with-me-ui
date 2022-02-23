import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {Error} from '../compoents';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [,updateUser] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const updateFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin = async (e) => {

    setError("");

    e.preventDefault();
    if(!formData.email.trim() || !formData.password.trim())
      return;

    try {
      const res = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        body : JSON.stringify(formData),
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();
      if(data.status != 200){
        setError(data.message);
      }else{
        updateUser(data.user);
      }

    } catch (err) {
      console.error(err);
      setError("Oups, something went wrong :(")
    }
  };

  return (
    <section className="max-w-xl m-auto mt-20">
      {error && <Error e={error}/>}
      <div className="shadow-lg rounded  p-6 mt-6">
        <h2 className="text-center text-2xl">
          Welcome Back, Let's Center Some Divs
        </h2>
        <form onSubmit={onLogin} className="mt-10 space-y-6">
          <div className="flex flex-col relative">
            <span className="after:content-['*'] after:absolute after:right-2 after:top-3 after:text-lg after:text-red-500 block text-sm font-medium text-slate-700"></span>
            <span className="absolute left-0 top-3 block text-slate-700">
              <FaEnvelope />
            </span>
            <input
              onChange={updateFormData}
              required
              value={formData.email}
              placeholder="Enter Your Email Here"
              type="email"
              name="email"
              className="border-b-2 border-gray-500 focus:border-0 py-2 px-6"
            />
          </div>
          <div className="flex flex-col relative">
            <span className="after:content-['*'] after:absolute after:right-2 after:top-3 after:text-lg after:text-red-500 block text-sm font-medium text-slate-700"></span>
            <span className="absolute left-0 top-3 block text-slate-700">
              <FaKey />
            </span>
            <input
              onChange={updateFormData}
              required
              value={formData.password}
              placeholder="Enter Your Password Here"
              type="password"
              name="password"
              className="border-b-2 border-gray-500 focus:border-0 py-2 px-6"
            />
          </div>
          <div>
            <Link
              to="/register"
              className="underline opacity-80 text-center block"
            >
              Don't Have An Account, What Are You Waiting For ?
            </Link>
            <input
              className="bg-black w-full mt-4 text-white py-2 px-6 cursor-pointer hover:opacity-80 rounded-sm"
              type="submit"
              value="Continue"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
