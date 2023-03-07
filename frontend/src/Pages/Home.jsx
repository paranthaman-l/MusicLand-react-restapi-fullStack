import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../Components/Banner";
import Actor from "../Components/HomeContent/Actor";
import PlaylistContainer from "../Components/PlaylistContainer";
import RecentSongs from "../Components/RecentSongs";

const Home = () => {
  return (
    <div className="flex flex-col mb-24">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Banner />
      <div className="ml-64 mt-4 rounded-xl mr-4 max-xl:ml-48">
        <div className="flex">
          <RecentSongs />
          <PlaylistContainer/>
        </div>
        <div className="text-mp-white font-alata mt-4 ml-3 pb-28">
            <Actor/>
        </div>
      </div>
    </div>
  );
};

export default Home;
