import { useState, useEffect } from "react";
import { allEvents } from "../../util/api";
import { eventProps } from "../../util/types";
import event from "../../assets/event.png";
import { Link } from "react-router-dom";
import Right from "../../assets/Right";
import Button from "../ui/Button";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    allEvents(3).then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-12 mt-4">
      <h2 className="font-semibold text-3xl leading-10 max-w-xl">
        Choose from the recent and Our Featured Events
      </h2>
      <div className="grid grid-cols-2 gap-7 px-28- ">
        {events?.map(({ title, _id }: eventProps, index) => {
          return (
            <div
              className={
                index === 1
                  ? " row-span-2 h-full relative"
                  : "bg-black- relative"
              }
            >
              <img
                className={
                  index === 1
                    ? "h-full  object-cover brightness-75 rounded-md"
                    : "w-full brightness-75 rounded-md"
                }
                src={event}
              />
              <div className="absolute bottom-8 left-5 text-white leading-8">
                <h1 className="font-bold text-2xl ">{title}</h1>
                <Link to={`event/${_id}`} className="text-lg underline">
                  {" "}
                  Learn more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="events" className="flex flex-col items-center">
        <Button
          icon={<Right />}
          text="View More Events"
          className="bg-lightBlue text-primary"
        />
      </Link>
    </div>
  );
};
export default Events;
