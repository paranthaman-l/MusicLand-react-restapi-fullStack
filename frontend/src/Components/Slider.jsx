import React from "react";
import { useStates } from "../States";
import Slider from "@material-ui/core/Slider";

const SongSlider = ({value,setValue}) => {
  const { sliderRef, audioRef,curSong } = useStates();

  const checkWidth = (e) => {
    let width = sliderRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioRef.current.currentTime = (divprogress / 100) * curSong.length;
  };
  const changeRange = () => {
    audioRef.current.currentTime = sliderRef.current.value;
    sliderRef.current.style.setProperty(
      "--seek-before-width",
      `${(sliderRef.current.value / audioRef.current.duration) * 100}%`
    );
  };
  return (
    <div>
      <Slider
        style={{color:"#623eba"}}
        ref={sliderRef}
        onClick={checkWidth}
        value={value}
        onChange={changeRange}
      />
    </div>
  );
};

export default SongSlider;
