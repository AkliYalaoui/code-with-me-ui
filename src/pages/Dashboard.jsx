import { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
  const { projectName } = useParams();
  const [code, setCode] = useState({ xml: "", css: "", javascript: "" });
  const [language, setLanguage] = useState("xml");
  const [srcDoc, setSrcDoc] = useState("");
  const [fileName, setFileName] = useState("index.html");
  const {
    profile: { imageUrl },
  } = useSelector((state) => state.user);

  const onSave = () => {
    
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${code.xml}</body>
      <style>${code.css}</style>
      <script>${code.javascript}</script>
    </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-800 text-gray-200">
        <Link
          to="/profile"
          className="flex p-2 items-center justify-center flex-col"
        >
          <img
            className="h-11 w-11 rounded-full bg-gray-200 p-1"
            src={imageUrl}
            alt=""
          />
        </Link>
        <nav className="mt-8">
          <ul>
            <li
              className="flex items-center space-x-2 cursor-pointer p-4 border-b border-gray-900 hover:bg-gray-900"
              onClick={() => {
                setFileName("index.html");
                setLanguage("xml");
              }}
            >
              <FaHtml5 />
              <span>index.html</span>
            </li>
            <li
              className="flex items-center space-x-2 cursor-pointer p-4 border-b border-gray-900 hover:bg-gray-900"
              onClick={() => {
                setFileName("styles.css");
                setLanguage("css");
              }}
            >
              <FaCss3 />
              <span>styles.css</span>
            </li>
            <li
              className="flex items-center space-x-2 cursor-pointer p-4 border-b border-gray-900 hover:bg-gray-900"
              onClick={() => {
                setFileName("script.js");
                setLanguage("javascript");
              }}
            >
              <FaJs />
              <span>script.js</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex flex-col md:flex-row items-stretch">
        <div className="flex-1">
          <div className="flex items-center justify-between p-2 border-l border-gray-900 bg-gray-800 text-gray-200">
            <span className="text-xl font-semibold">
              {projectName} - {fileName}
            </span>
            <button
                className="bg-gray-900 rounded p-2 shadow hover:bg-opacity-70"
                onClick={onSave}
              >
                save
              </button>
          </div>
          <CodeMirror
            value={code[language]}
            className="bg-gray-900"
            options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setCode((prevCode) => ({ ...prevCode, [language]: value }));
            }}
          />
        </div>
        <iframe
          title="source code"
          frameBorder="0"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          width="100%"
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default Dashboard;
