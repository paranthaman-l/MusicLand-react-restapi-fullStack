import React, { useEffect, useState } from "react";
import { useStates } from "../States";
import { IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import axios from "../Api/axios";
import Favorite from "@mui/icons-material/Favorite";
import { deepPurple } from "@mui/material/colors";
const HeroSong = () => {
  const { likedSongs, setSongs, setCurSong, songs,hero,curSong } = useStates();
  const [heroSongs, setHeroSongs] = useState([])
  const setHeroSongs1 = (name) => {
    axios.get(`/songs/hero/${name}`).then((res) => {
      setSongs(res.data);
      console.log(res.data);
    });
  };
useEffect(() => {
    const getHeroSongs = (heroName) => {
        axios.get(`/songs/hero/${heroName}`).then((res) => {
          setHeroSongs(res.data);
        });
      };
      getHeroSongs(hero.name);
}, [hero])
const [select, setSelect] = useState(0);
  const clickedSong = (id) => {
    setSelect(id);
  };
  return (
    <div className="w-5/6 ml-[246px] pb-12">
      <div className="flex bg-gradient-to-b from-mp-very-light-black  to-mp-violet  p-10 rounded-3xl items-center">
        <img
          className="h-60 rounded-xl"
          src={hero.img}
          alt=""
        />
        <div className="flex flex-col ml-10 text-mp-white font-alata">
          <span className="text-lg mt-8">ACTOR</span>
          <p className="text-8xl font-semibold  ">{hero.name}</p>
          <div className="flex mt-9 items-center">
            <p className="text-base ml-4">3 songs</p>
          </div>
        </div>
        <div className="ml-20">
          <IconButton
            onClick={() => {
              setHeroSongs1(hero.name);
              setCurSong(songs[Math.floor(Math.random() * songs.length)]);
            }}
            sx={{ backgroundColor: "#1fdf64" }}
            className="p-4 w-12 flex justify-center items-center h-12 border-spacing-1 border-mp-white"
          >
            <PlayCircleIcon className="text-mp-violet text-xl" />
          </IconButton>
        </div>
      </div>
       <div className="flex mt-4 text-mp-white flex-col mb-24">
      <div className="flex w-full text-xl font-alata">
        <p className="ml-10">#</p>
        <ul className="flex w-full justify-between px-36">
          <li>TITLE</li>
          <li className="ml-10">HERO</li>
          <li>ALBUM</li>
          <li></li>
        </ul>
      </div>
      <div className="">
        {heroSongs.map((song, i) => {
          return (
            <div
              key={i}
              onClick={() => clickedSong(song.id)}
              onDoubleClick={() => {
                setCurSong(song);
                setSelect(0);
              }}
              className={`flex pl-10 cursor-pointer my-2 items-center text-xl hover:bg-mp-light-black rounded-2xl p-2 ${
                curSong.id === song.id && "bg-mp-black"
              } ${select === song.id && "bg-mp-very-light-black"}`}
            >
              <p className="text-lg font-alata">{i + 1}</p>
              <img
                className="w-14 h-14 ml-7 rounded-full"
                src={song.img}
                alt=""
              />
              <div className="ml-4 w-3/12">
                <p
                  className={`text-base font-semibold font-alata tracking-wide ${
                    curSong.id === song.id && "text-mp-green"
                  } ${select === song.id && "text-mp-violet"}`}
                >
                  {song.title}
                </p>
                <p className="text-xs">
                  {song.music},{" " + song.lyricist},{" " + song.singer}
                </p>
              </div>
              <p className="ml-16 text-base font-bold w-3/12">{song.hero}</p>
              <p className="text-base font-semibold w-1/6">{song.movie}</p>
              {curSong.id === song.id ? (
                <div className="w-14 pt-3 mr-3 h-14 absolute right-10">
                  <img
                    src="https://thumbs.gfycat.com/AcclaimedHeartfeltGoat-size_restricted.gif"
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default HeroSong;
