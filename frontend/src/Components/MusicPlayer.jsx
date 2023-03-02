import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useStates } from "../States";
import Slider from "@material-ui/core/Slider";

const MusicPlayer = () => {
  const { audioRef, sliderRef, isLoop, curSong, nextSong, setRecentPlaySongs } =
    useStates();
  const [value, setValue] = useState(0);
  useEffect(() => {
    sliderRef.current.max = audioRef.current.duration;
  }, [audioRef.current?.readyState]);
  const onplaying = () => {
    const duration = audioRef.current.duration;
    const cur_time = audioRef.current.currentTime;
    setValue((cur_time / duration) * 100);
  };
  const checkWidth = (e) => {
    const width = sliderRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioRef.current.currentTime =
      (divprogress / 100) * audioRef.current.duration;
  };
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return "00:00";
  }
  const formatTime1 = (time) => {
    if (time && !isNaN(time)) {
      const max = audioRef.current.duration;
      const minutes =
        Math.floor((max - time) / 60) < 10
          ? `0${Math.floor((max - time) / 60)}`
          : Math.floor((max - time) / 60);
      const seconds =
        Math.floor((max - time) % 60) < 10
          ? `0${Math.floor((max - time) % 60)}`
          : Math.floor((max - time) % 60);

      return `- ${minutes}:${seconds}`;
    }
    return "00:00";
  };
  return (
    <div className="flex justify-center items-center text-center -ml-9">
      <p className="text-sm font-normal text-mp-gray font-poppins w-10">
        {formatTime(audioRef.current?.currentTime)}
      </p>
      <Box width={500} className="mx-5 flex justify-center items-center">
        <Slider
          style={{ color: "#623eba" }}
          ref={sliderRef}
          min={0}
          defaultValue={0}
          onClick={checkWidth}
          value={value}
        />
      </Box>
      <audio
        className="h-10 mx-3"
        ref={audioRef}
        src={curSong.url}
        loop={isLoop}
        onTimeUpdate={onplaying}
        onEnded={() => {
          setRecentPlaySongs((song) => {
            return [curSong, ...song];
          });
          nextSong();
        }}
        autoPlay
      ></audio>
      <p className="text-sm font-normal text-mp-gray font-poppins w-14">
        {formatTime1(audioRef.current?.currentTime)}
      </p>
    </div>
  );
};

export default MusicPlayer;
