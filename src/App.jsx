import React from "react";
import Weather from "./components/Weather";
let API_KEY = "5ef0924159510bdb03154104489e2eea";

const App = () => {
  return (
    <div className=" w-full h-screen bg-gray-950"  >
        <Weather />
    </div>
  );
};

export default App;
