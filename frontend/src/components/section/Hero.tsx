import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { data } from "../data/festivals";
import { heroProps } from "../../util/types";
import Button from "../ui/Button";

const Hero = () => {
  const [slide, setSlide] = useState();
  return (
    <div>
      <div className="w-full">
        <Swiper slidesPerView={1}>
          <div>
            {data.map(({ image, title, description }: heroProps) => {
              return (
                <SwiperSlide className="relative">
                  <img
                    className="w-full"
                    src={image}
                  />
                  <div className="absolute text-white z-10 bottom-52 flex flex-col items-center px-10- gap-12 left-96">
                    <h1 className="text-7xl font-semibold leading-10 ">
                      {title}
                    </h1>
                    <p className="text-xl leading-6 max-w-3xl text-center">
                      {description}
                    </p>
                    <div className="flex gap-5 ">
                      <Button text="sign Up Now" />
                      <Button
                        className="bg-white border-primary border "
                        text="
                  Learn more"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
      <div className="flex px-16 py-28 gap-12">
        <div>
          <h1 className="text-5xl  font-bold leading-[57px] ">
            We’re the leading Platform to connect{" "}
            <span className="text-primary">women in Tech.</span>{" "}
          </h1>
        </div>
        <div className="flex flex-col gap-24">
          <h2 className="text-base leading-5 pt-4">
            Join Tech Connekt Mission of connecting women in tech and inspiring
            them to come together for the greater good. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Suspendisse varius enim in eros
            elementum tristique.
          </h2>
          <div className="flex  gap-8 ">
            <Button text="Join Us Now" />
            <Button
              className="bg-white text-primary border border-primary"
              text="About us"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
