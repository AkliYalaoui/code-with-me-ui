import React from "react";

const Error = ({ e }) => {
  return (
    <div className="bg-red-300 text-red-800 font-medium p-2 rounded-sm mb-2 text-center">
      {e}
    </div>
  );
};

export default Error;
