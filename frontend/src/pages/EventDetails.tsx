import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { event } from "../util/api";
import Button from "../components/ui/Button";

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
      <h1 className="font-semibold text-4xl text-center">
        Empowering Innovators: Celebrating Women in Tech Revolutionising the
        Industry
      </h1>
      <p className="text-base text-dark">
        In the ever-evolving landscape of technology, women have been
        instrumental in driving innovation, yet their contributions often remain
        overlooked or under.
      </p>
      <div className="flex items-center gap-8">
        <button className="bg-secondary text-white px-10 py-3 rounded-full text-base ">
          Apply Now
        </button>
        <button className="border border-secondary bg-white text-secondary  px-10 py-3 rounded-full">
          Share
        </button>
      </div>
    </div>
  );
};
export default EventDetails;
