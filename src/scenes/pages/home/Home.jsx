import React from "react";

// Components
import Grid from "../../../components/Grid";

const Home = () => {
  return (
    <div className="home min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-400">
      <div className="bg-white bg-opacity-10 rounded p-8 min-h-screen">
        <h1 className="text-white text-center font-extrabold text-4xl md:text-6xl mb-8">
          Welcome to TodoList App
        </h1>
        <Grid />
      </div>
    </div>
  );
};

export default Home;
