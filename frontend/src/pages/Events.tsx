import Search from "../components/ui/Search";
import { useState, useEffect } from "react";
import { allEvents } from "../util/api";
import girls from "../assets/girls.png";
import Button from "../components/ui/Button";
import Like from "../assets/Like";
import { eventProps } from "../util/types";
import Discover from "../components/ui/Discover";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    allEvents(0).then((data) => {
      setEvents(data);
    });
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center gap-12 py-16 bg-gradient-to-r- from-pink-50 to-blue-50- ">
        <button className="border rounded-3xl text-red border-red bg-[#FEEFF4] py-2 px-10 ">
          Connect Through Tech events
        </button>
        <div className="flex flex-col gap-5">
          <h1 className="font-semibold text-4xl leading-10 text-darkGrey text-center">
            Platform that Unlocking Potential<br></br>{" "}
            <span className="text-secondary">Women</span> Leading in{" "}
            <span className="text-secondary">Tech</span>{" "}
          </h1>
          <p className="text-base font-medium text-greyy text-center max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>

        <Search placeholder="Looking for a specific Event?" text="Search" />
      </div>
      <div className="pt-12">
        <h2 className="text-center text-3xl leading-10 font-medium ">
          Explore inspiring <span className="text-secondary">Events</span>
        </h2>
        <div className="grid grid-cols-3 pt-16 gap-8 overflow-auto h-[32rem] ">
          {events.map(({ title, description, date, cost }: eventProps) => {
            return (
              <div className="relative">
                <img src={girls} alt="" className="" />
                <div className="absolute top-4 right-24 z-10 ">
                  <Like />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl leading-10 text-darkest">
                      {title}
                    </h1>
                    <p className="text-greyy leading-5">{description}</p>
                  </div>

                  <div className="flex items-center font-semibold text-xs text-greyy gap-3">
                    <p>{date}</p>
                    <p>{cost}</p>
                  </div>
                  <div className="flex justify-start">
                    <Button
                      text="Book Event"
                      className="border border-primary bg-white text-primary"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center pt-24">
          <Discover text="Explore more events" />
        </div>
      </div>
    </div>
  );
};
export default Events;
