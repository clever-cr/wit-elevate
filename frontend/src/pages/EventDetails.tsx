import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { event } from "../util/api";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState();
  const params = useParams();

  useEffect(() => {
    event(params.id).then((data) => {
      setEventDetails(data);
    });
  }, [params.id]);
  console.log("detailsss", eventDetails);
  return <h1>Event detailss</h1>;
};
export default EventDetails;
