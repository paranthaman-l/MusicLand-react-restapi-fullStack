import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useStates } from "../States";
import Slider from "@material-ui/core/Slider";

const MusicPlayer = () => {
  const {
    audioRef,
    sliderRef,
    endMinutes,
    setEndMinutes,
    endSeconds,
    setEndSeconds,
    isLoop,
    curSong,
    curMinutes,
    setCurMinutes,
    curSeconds,
    setCurSeconds,
    nextSong,
    setRecentPlaySongs,
    setCurSong,
  } = useStates();
  const [value, setValue] = useState(0)
  useEffect(() => {
    sliderRef.current.max = audioRef.current.duration;
  }, [audioRef.current?.readyState])
  const onplaying =()=>{
    // sliderRef.current.value = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const cur_time = audioRef.current.currentTime;
    setValue((cur_time/duration)*100)
  }
  const checkWidth =(e)=>{
    const width  = sliderRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioRef.current.currentTime = (divprogress / 100) * audioRef.current.duration;
  }
  const ChangeRange = (e) =>{
    
  }
  return (
    <div className="flex justify-center items-center">
      <p className="text-sm font-normal text-mp-gray">
        
      </p>
      <Box width={500} className="mx-5 flex justify-center items-center">
        <Slider
          style={{ color: "#623eba"}}
          ref={sliderRef}
          min={0}
          defaultValue={0}
          onClick={checkWidth}
          value={value}
          // onChange={ChangeRange}
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
      <p className="text-sm font-normal text-mp-gray">
        
      </p>
    </div>
  );
};

export default MusicPlayer;
