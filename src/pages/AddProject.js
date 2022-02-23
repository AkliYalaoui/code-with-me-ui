import ProjectIcon from "../assets/createproject.svg";
import { useState } from "react";
import { Error } from "../compoents";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddProject = () => {
  const [user] = useAuth();
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [projectId, setProjectId] = useState(null);

  const updateForm = (e) => {
    setMetaData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createProject = async (e) => {
    setError("");
    e.preventDefault();
    if (!metaData.title.trim() || !metaData.description.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/api/project/create`, {
        method: "POST",
        body: JSON.stringify(metaData),
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status != 201) {
        setError(data.message);
      } else {
        console.log(data.project);
        setProjectId(data.project._id);
      }
    } catch (err) {
      console.error(err);
      setError("Oups something Went Wrong :(");
    }
  };

  return (
    <>
      {projectId && <Navigate to={`/project/${projectId}`} />}
      <div className="max-w-2xl m-auto">
        <h2 className="text-2xl sm:text-4xl text-center font-medium mb-8">
          Create New Project
        </h2>
        <img src={ProjectIcon} className="w-64 m-auto mb-6" />
        {error && <Error e={error} />}
        <form
          onSubmit={createProject}
          className="shadow-lg p-4 rounded mt-6 space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="title">Title :</label>
            <input
              required
              className="py-2 px-4 bg-gray-100 rounded"
              type="text"
              id="title"
              name="title"
              value={metaData.title}
              onChange={updateForm}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="description">Description :</label>
            <input
              required
              className="py-2 px-4 bg-gray-100 rounded"
              type="text"
              id="description"
              name="description"
              value={metaData.description}
              onChange={updateForm}
            />
          </div>
          <div>
            <input
              className="bg-gray-900 w-full mt-4 text-white py-2 px-6 cursor-pointer hover:opacity-80 rounded-sm"
              type="submit"
              value="Create"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProject;
