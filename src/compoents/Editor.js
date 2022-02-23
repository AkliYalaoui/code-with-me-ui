import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/xml/xml"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import "./Editor.css"

import {Controlled as ControlledEditor} from "react-codemirror2-react-17"
import { useState } from "react";
import {FaExpandAlt} from "react-icons/fa";

const Editor = ({name,language,value,onChange}) => {

    const [open,setOpen] = useState(true);
    
    const handleChange = (editor,data,value) =>{
        onChange(value);
    };

  return (
    <div className={`m-2 ${open ? "flex-1": ""}`}>
        <div className="text-white py-2 px-4 bg-gray-800 flex justify-between items-center">
          <span>{name}</span>
          <button className="cursor-pointer" onClick={() => setOpen(prevOpen => !prevOpen)}><FaExpandAlt/></button>
        </div>
        <ControlledEditor onBeforeChange={handleChange} value={value}
        options={{
            lineWrapping:true,
            lint:true,
            mode : language,
            theme:"material",
            lineNumbers:true
        }}/>
    </div>
  )
}

export default Editor