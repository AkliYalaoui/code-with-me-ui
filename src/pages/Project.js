import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Error, Editor } from "../compoents";
import { useAuth } from "../context/AuthProvider";
import io from "socket.io-client";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Project = () => {
  const [user] = useAuth();
  const [error, setError] = useState("");
  const [project, setProject] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setsrcDoc] = useState("");
  const { id } = useParams();
  const [contributers, setContributers] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(io(`${BASE_URL}`));
    return () => socket?.close();
  }, []);

  useEffect(() => {
    socket?.emit("join-project", id);
  }, [socket]);

  useEffect(() => {
    const receiveCode = (code) => {
      setHtml(code.html);
      setCss(code.css);
      setJs(code.js);
    };
    socket?.on("receive-code", receiveCode);
    return () => socket?.removeListener("receive-code", receiveCode);
  }, [socket]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(`
        <html>
        <body style="word-break:break-word;">${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>
      `);
      socket?.emit("send-code", id, {
        html: html ? html : "",
        css: css ? css : "",
        js: js ? js : "",
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [socket, html, css, js]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/project/${id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        if (data.status != 200) {
          setError(data.message);
        } else {
          setProject(data.project);
          setHtml(data.project.html);
          setCss(data.project.css);
          setJs(data.project.js);
          setContributers((prev) => [...prev, ...data.project.contributers]);
        }
      } catch (err) {
        console.error(err);
        setError("Oups something Went Wrong :(");
      }
    };
    getProject();
  }, [id]);

  const download = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/project/download/${id}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.text();
      if (data.status && data.status != 200) {
        setError(data.message);
      } else {
        console.log(data);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "project.html");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error(err);
      setError("Oups something Went Wrong :(");
    }
  };

  const saveProject = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/project/content/${id}`, {
        method: "PUT",
        body: JSON.stringify({ html : html ? html: "", css : css ? css:"", js: js ? js:"" }),
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status != 200) {
        setError(data.message);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Oups something Went Wrong :(");
    }
  };
  const addContributer = async () => {
    const contributerId = prompt("Enter Your Contributer Id");
    if (!contributerId) return;

    try {
      const res = await fetch(`${BASE_URL}/api/project/add/contributer/${id}`, {
        method: "POST",
        body: JSON.stringify({ contributerId }),
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status != 200) {
        setError(data.message);
      } else {
        console.log(data.message);
        setContributers((prevContributers) => [
          ...prevContributers,
          data.newContributer,
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("Oups something Went Wrong :(");
    }
  };

  return (
    <>
      {error ? (
        <Error e={error} />
      ) : (
        <div>
          <section className="flex justify-center items-center mb-4">
            {contributers.map((contributer) => (
              <div key={contributer._id} className="m-2 text-center">
                <div className="rounded-full bg-gray-900 text-center text-white p-2 h-10 w-10">
                  {contributer.username[0].toUpperCase()}
                </div>
                <span className="opacity-75">
                  {contributer.username.slice(0, 8)}
                </span>
              </div>
            ))}
          </section>

          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold"># {project.title}</h2>
              <p className="opacity-80">- {project.description}</p>
            </div>
            <div className="space-x-2">
              {project.userId === user._id && (
                <button
                  onClick={addContributer}
                  className="px-5 py-3 cursor-pointer bg-gray-900 text-white rounded hover:opacity-80"
                >
                  share
                </button>
              )}
              <button
                onClick={download}
                className="px-5 py-3 cursor-pointer bg-green-600 text-white rounded hover:opacity-80"
              >
                download
              </button>
              <button
                onClick={saveProject}
                className="px-5 py-3 cursor-pointer bg-blue-600 text-white rounded hover:opacity-80"
              >
                save
              </button>
            </div>
          </header>
          <section className="mt-4">
            <div className="bg-gray-900 flex">
              <Editor
                name="HTML"
                language="xml"
                value={html}
                onChange={setHtml}
              />
              <Editor name="CSS" language="css" value={css} onChange={setCss} />
              <Editor
                name="JS"
                language="javascript"
                value={js}
                onChange={setJs}
              />
            </div>
            <div className="border border-gray-400">
              <iframe
                style={{ minHeight: "300px" }}
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Project;
