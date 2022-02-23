import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {Error} from '../compoents';
import {Link} from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const [user] = useAuth();
  const [projects, setProjects] = useState([]);
  const [error,setError] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/project/user`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          }
        });
        const data = await res.json();
        if(data.status != 200){
          setError(data.message)
        }else{
          setProjects(data.projects);
        }
      } catch (err) {
        console.error(err);
        setError("Oups something Went Wrong :(");
      }
    };
    getProjects();
  }, []);

  return (
    <main className="max-w-5xl m-auto mt-4">
      <section className="flex items-center justify-center space-x-4">
        <div
          className="bg-gray-900 text-white rounded-full px-7 py-5 text-center h-20 w-20 text-4xl border-2 border-purple-400"
          style={{ lineHeight: "100%" }}
        >
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-medium">UserName : {user.username}</h2>
          <span className="opacity-80">Email : {user.email}</span>
          <div className="opacity-80">ID : {user._id}</div>
        </div>
      </section>
      <h3 className="flex items-baseline space-x-2 text-2xl my-10">
        <span>My List Of Projects</span>
        <span className="inline-block h-0.5 rounded-full bg-black flex-1"></span>
      </h3>
      <section>
        {error && <Error e={error}/>}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project =>(
            <Link key={project._id} to={`/project/${project._id}`}>
              <article className="shadow-md rounded-md overflow-hidden w-80" className="hover:shadow-2xl">
                <iframe
                  srcDoc={`
                  <html>
                  <body style="overflow:hidden;">${project.html}</body>
                  <style>${project.css}</style>
                  <script>${project.js}</script>
                  </html>
                `}
                  className="overflow-hidden border-x-2 border-t-2 border-gray-400 p-2"
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="250px"
                ></iframe>
                <div className="bg-gray-900 text-white p-4 text-center">
                  <h4 className="font-medium text-xl">{project.title}</h4>
                  <p className="opacity-80 my-2">{project.description}</p>
                  <time className="text-xs opacity-80 mt-4 block text-right" dateTime={project.createdAt}>{new Date(project.createdAt).toLocaleString()}</time>
                </div>
            </article>
            </Link>
          ))}
        </div>
        {projects.length === 0 && <div className="text-center">
          No Projects To Display :( . Create One Now !
          </div>}
      </section>
    </main>
  );
};

export default Dashboard;
