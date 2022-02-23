import { FaUser, FaKey,FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Error } from "../compoents";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register = () => {
  const [,updateUser] = useAuth();

  const [formData, setFormData] = useState({
    username : "",
    email: "",
    password: "",
    confirmPassword : ""
  });

  const [errors, setErrors] = useState([]);

  const updateFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegister = async (e) => {
    setErrors([]);
    e.preventDefault();
    if(!formData.username.trim() || !formData.password.trim() || !formData.email.trim())
      return;

    if(formData.password !== formData.confirmPassword){
      setErrors(["Password mismatched, please confirm it again"]);
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        body : JSON.stringify(formData),
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();
      if(data.status != 201){

        console.log(data);
        let er = [];

        for(let v in data.error){
          er.push(data.error[v]);
        }
        setErrors([data.message,...er]);

      }else{
       updateUser(data.user);
      }

    } catch (err) {
      console.error(err);
      setErrors(["Oups, something went wrong :("]);
    }
  };

  return (
    <section className="max-w-xl m-auto mt-6">
      {errors && errors.map((e,i) => <Error key={i} e={e}/>)}
      <div className="shadow-lg rounded  p-6 mt-4">
        <h2 className="text-center text-2xl">
          Hey There, Join Us And Enjoy Coding In <br/> Real Time
        </h2>
        <form onSubmit={onRegister} className="mt-10 space-y-6">
          <div className="flex flex-col relative">
            <span className="after:content-['*'] after:absolute after:right-2 after:top-3 after:text-lg after:text-red-500 block text-sm font-medium text-slate-700"></span>
            <span className="absolute left-0 top-3 block text-slate-700">
              <FaUser />
            </span>
            <input
              onChange={updateFormData}
              required
              value={formData.username}
              placeholder="Enter Your Username Here"
              type="username"
              name="username"
              className="border-b-2 border-gray-500 focus:border-0 py-2 px-6"
            />
          </div>
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
          <div className="flex flex-col relative">
            <span className="after:content-['*'] after:absolute after:right-2 after:top-3 after:text-lg after:text-red-500 block text-sm font-medium text-slate-700"></span>
            <span className="absolute left-0 top-3 block text-slate-700">
              <FaKey />
            </span>
            <input
              onChange={updateFormData}
              required
              value={formData.confirmPassword}
              placeholder="Confirm Your Password Here"
              type="password"
              name="confirmPassword"
              className="border-b-2 border-gray-500 focus:border-0 py-2 px-6"
            />
          </div>
          <div>
            <Link
              to="/register"
              className="underline opacity-80 text-center block"
            >
             Already Have An Account, Let's Connect You ?
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

export default Register;
