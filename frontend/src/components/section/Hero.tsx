import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

import { heroProps } from "../../util/types";
import Button from "../ui/Button";
import hero from "../../assets/hero.png";
import Connect from "../../assets/Connect";
import Arrow from "../../assets/Arrow";
import { Link } from "react-router-dom";

const Hero = () => {
  const [slide, setSlide] = useState();
  return (
    <div className="flex items-center gap-48">
      <div className="flex flex-col  gap-12">
        <div className="gap-7 flex  flex-col">
          <h1 className="font-bold text-5xl max-w-xl leading-[52.8px]">
            We’re the <br></br>leading Platform to connect women in Tech.
          </h1>
          <p className="text-lg text-grey  max-w-lg">
            Join WIT Elevate Connect Mission of connecting women in tech and
            inspiring them to come together for the greater good
          </p>
        </div>

        <div className="flex gap-8 ">
          <Link to="partner">
            <Button
              text="Join us Now"
              className="text-white bg-secondary"
              icon={<Arrow />}
            />
          </Link>

          <Button text="learn more" className="bg-lighty text-dark" />
        </div>
      </div>
      <div className="relative">
        <img src={hero} />
        <div className="absolute bg-white opacity-90   w-[228px]   backdrop-blur-2xl- bottom-[68px]  -left-10  h-[228px] rounded-xl flex flex-col items-center py-8  px-5">
          <div className=" bg-white w-16 h-16 rounded-full relative">
            <p className="absolute top-4 left-4 text-3xl">🤝</p>
          </div>
          <div className="flex flex-col gap-2 items-center pt-5">
            <h3 className="font-bold   text-dark text-sm leading-4">
              You’re connected!
            </h3>
            <p className="text-light text-xs text-center">
              Network through this platform and one-one in the event
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
