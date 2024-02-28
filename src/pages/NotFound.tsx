import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center my-6">
      <h1 className="text-4xl my-2">Page Not Found</h1>
      <p className="text-xl">You can go back to the home page.</p>
      <button
        className="bg-slate-800 my-4 text-white text-xl p-2 rounded-lg addButton"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
