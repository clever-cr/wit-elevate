import { useState, useEffect } from "react";
import { allEvents } from "../../util/api";
import { eventProps } from "../../util/types";
import picture from "../../assets/girls.png";
import Button from "../ui/Button";
import Calendar from "../../assets/Calendar";
import Cost from "../../assets/Cost";
import Locations from "../../assets/Locations";
import Arrow from "../../assets/Arrow";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    allEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <div className="pt-10 flex flex-col gap-16">
      <div>
        <h1 className="font-bold leading-tight  text-center  text-5xl ">
          Choose Among Our <span className="text-primary">Featured </span>
        </h1>
        <h1 className="font-bold leading-tight  text-center  text-5xl text-primary">
          Events
        </h1>
      </div>

      <div className="grid grid-cols-3 px-20 gap-8">
        {events?.map(({ title, date, location, cost }: eventProps) => {
          return (
            <div className="flex flex-col gap-5 pb-5">
              <img src={picture} />
              <div className="flex flex-col gap-5 px-5">
                <h1 className="font-bold text-2xl leading-8">{title}</h1>
                <div className="text-dark text-sm leading-3 ">
                  <div className=" flex items-center gap-10 ">
                    <div className="flex items-center gap-0.5">
                      <Calendar />
                      <p>{`: ${date}`}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Locations />
                      <p>{location}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 ">
                  <Cost />
                  <p className="text-dark text-sm leading-3 ">{cost}</p>
                </div>

                <div className="flex justify-between">
                  <Button
                    className="bg-white border border-primary text-primary"
                    text="Register for This Event"
                  />
                  <Button
                    text="..."
                    className="
              "
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <Button
          className="bg-white border border-primary text-primary"
          text="View More Event"
          icon={<Arrow />}
        />
      </div>
    </div>
  );
};
export default Events;
