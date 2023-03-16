import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import { IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useStates } from "../../States";
const AlbumSongs = () => {
    const [heros, setHeros] = useState([]);
    useEffect(() => {
      axios.get(`/artists/role/Album Song`).then((res) => {
        setHeros(res.data);
      });
    }, []);
    const { setSongs, setCurSong, songs, gotoHeroPage,gotoHomePage } = useStates();
    const setHeroSongs = (name) => {
      axios.get(`/songs/Album Song/${name}`).then((res) => {
        setSongs(res.data);
        console.log(res.data);
      });
    };
    return (
      <div className="flex flex-col justify-center">
        <span className="">Album Songs</span>
        <div className="overflow-scroll flex mt-5 rounded-md">
          {heros.map((hero) => {
            return (
              <>
                <div
                  onClick={() => gotoHeroPage(hero)}
                  className="h-56 -z-0 w-48 flex justify-center rounded-lg items-center flex-col mr-4 bg-mp-light-black hover:bg-mp-black1 cursor-pointer group p-10 duration-300 transform"
                >
                  <span className="absolute right-5 mt-10 invisible group-hover:visible">
                    <IconButton
                      onClick={() => {
                        setHeroSongs(hero.name);
                        gotoHomePage();
                        setCurSong(
                          songs[Math.floor(Math.random() * songs.length)]
                        );
                      }}
                      sx={{ backgroundColor: "#1fdf64" }}
                      className="p-4 w-12 flex justify-center items-center h-12 border-spacing-1 border-mp-white hover:bg-mp-red"
                    >
                      <PlayCircleIcon className="text-mp-violet text-xl" />
                    </IconButton>
                  </span>
                  <div className="w-48 h-56 flex justify-center flex-col items-center duration-300">
                    <img
                      className="h-32 w-32 rounded-full"
                      src={hero.img}
                      alt=""
                    />
                    <p className="text-base mt-2">{hero.name}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
}

export default AlbumSongs