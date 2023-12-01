import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { event } from "../util/api";
import cpic from "../assets/cpic.png";
import { PiCalendarBlank } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import Profile from "../assets/profile.png";
import meeting from "../assets/meeting.png";
const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState();
  const params = useParams();
  useEffect(() => {
    event(params.id).then((data) => {
      setEventDetails(data);
    });
  }, [params.id]);
  console.log("detailsss", eventDetails);
  return (
    <div>
      <h1 className="font-semibold text-4xl text-center mt-32">
        Empowering Innovators: Celebrating <br></br> Women in Tech
        Revolutionising the <br></br>
        Industry
      </h1>
      <p className="text-base text-dark text-center mt-6">
        In the ever-evolving landscape of technology, women have been
        instrumental in <br></br> driving innovation, yet their contributions
        often remain overlooked or under.
      </p>
      <div className="flex items-center gap-8 ml-[650px] mt-[75px] ">
        <button className="bg-secondary text-white px-10 py-3 rounded-full text-base  ">
          Apply Now
        </button>
        <button className="border border-secondary bg-white text-secondary  px-10 py-3 rounded-full">
          Share
        </button>
      </div>
      <div className="items-cente ml-[665px] mt-2">
        <span className="text-xs text-slate-400">No credit card required</span>
      </div>
      <div className="ml-[400px] mt-10">
        <img src={meeting} className="w-[790px] h-[450px]" />
        <h1 className="mt-2 text-[18px] font-semibold">
          Empowering Innovators: Celebrating Women in Tech Revolutionising the
          Industry
        </h1>
        <div className="flex">
          <p>45 slots remains</p>
          <p className="ml-2 -mt-1">.</p>
          <p className="ml-2">Hosted by WIT Elevate</p>
        </div>
      </div>
      <div className="bg-[#F4F1F1] w-[790px] h-0.5 ml-[400px] mt-8"></div>
      <div>
        <div className="flex ml-[400px] mt-8 text-[#B3B2B2]">
          <PiCalendarBlank className="w-6 h-6" />
          <p className="text-[14px] ml-3">23 Dec 2023 - 27 Dec 2023</p>
        </div>
        <div className="flex ml-[400px] mt-6 text-[#B3B2B2]">
          <GoClock className="w-6 h-6" />
          <p className="text-[14px] ml-3">08 : 00 AM - 05 : 00 PM</p>
        </div>
        <div className="flex ml-[400px] mt-6 text-[#B3B2B2]">
          <SlLocationPin className="w-6 h-6" />
          <p className="text-[14px] ml-3">KN 599 St. Kiyovu Great Hotel</p>
        </div>
      </div>
      <div className="bg-[#F4F1F1] w-[790px] h-0.5 ml-[400px] mt-8"></div>
      <div className="ml-[400px] mt-6">
        <p>
          It was a Thursday, but it felt like a Monday to John. And John loved
          Mondays. He thrived at work. He dismissed <br></br>
          the old cliché of dreading Monday mornings and refused to engage in
          water-cooler complaints about <br></br>
          “the grind” and empty conversations that included the familiar parry
          “How was your weekend?” “Too short!”. Yes, <br></br>
          John liked his work and was unashamed.<br></br> <br></br>
          <span className="text-[#8B8A8A]">
            I should probably get another latte. I’ve just been sitting here
            with this empty cup. But then I’ll start to get jittery. <br></br>
          </span>
          <span className="text-[#B4B1B1]">
            I’ll get a decaf. No, that’s stupid, it feels stupid to pay for a
            decaf. I can’t justify that. John was always impatient on
          </span>
          <br></br>
          <span className="text-[#D7D4D4]">
            the weekends; he missed the formal structure of the business week.
            When he was younger he used to stay late
          </span>
        </p>
        <div className="flex">
          <button className="border-b border-black bg-transparent hover:bg-gray-100   transition duration-300 ease-in-out font-bold">
            Show more
          </button>
          <FaAngleRight className="mt-[6px] text-[#8B8A8A] " />
        </div>
      </div>
      <div className="bg-[#F4F1F1] w-[790px] h-0.5 ml-[400px] mt-16"></div>
      <div className="ml-[400px] mt-11">
        <h1 className="font-semibold  text-[18px]">Events speakers</h1>
        <p>Listen. Learn. Get inspired from our special speakers. </p>
      </div>
      <div className="flex gap-16 ml-[400px] mt-11">
        <div className="flex items-center gap-3 ">
          <img
            src={Profile}
            alt="profile"
            className="w-[100px] h-[100px] rounded-full"
          />
          <div>
            <h1 className="font-semibold  text-[18px]">Clever Umuhuza</h1>
            <p>
              Listen. Learn. Get inspired from our <br></br> special speakers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 ">
          <img
            src={Profile}
            alt="profile"
            className="w-[100px] h-[100px] rounded-full"
          />
          <div>
            <h1 className="font-semibold  text-[18px]">John Uwimana</h1>
            <p>
              Listen. Learn. Get inspired from our <br></br> special speakers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetails;
