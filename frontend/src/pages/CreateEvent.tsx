import Input from "../components/ui/Input";
import { GoPlus } from "react-icons/go";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { createEvent } from "../util/api";
import { formData } from "../util/types";
const CreateEvent = () => {
  const [eventContent, setEventContent] = useState<formData>({});

  const handleChange = (e: any) => {
    setEventContent({ ...eventContent, [e.target.name]: e.target.value });
  };

  const hanndleSubmit = (e: any) => {
    e.preventDefault();
    createEvent(eventContent).then((data) => {
      setEventContent(data);
    });
  };
  return (
    <div className="flex justify-center- py-14 px-12">
      <form className="flex flex-col gap-4" onSubmit={hanndleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Event title</label>
          <Input
            value={eventContent.title}
            name="title"
            className="w-[550px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event Details</label>
          <Input
            value={eventContent.description}
            name="description"
            className="w-[550px] h-[140px]"
          />
        </div>
        <div className="flex justify-start">
          <button className="bg-[#FBFBFB] flex flex-col items-center p-5 text-[#9D9D9D] border border-[#9D9D9D] ">
            <GoPlus />
            <h1>Add Image</h1>
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div>
            <h1>Date</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  onChange={(value, context) => {
                    console.log("sdh", value);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <h1>Time</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker label="Basic time picker" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label> Location</label>
          <Input
            value={eventContent.location}
            name="location"
            className="w-[550px]"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col">
            <label>Price</label>
            <Input
              value={eventContent.cost}
              name="cost"
              className="w-[300px]"
            />
          </div>
          <div className="flex flex-col">
            <label>Organiser</label>
            <Input
              value={eventContent.organiser}
              name="organiser"
              className="w-[300px]"
            />
          </div>
        </div>
        <div className="pt-2 flex justify-start">
          <button
            type="submit"
            onClick={hanndleSubmit}
            className="border-secondary border px-4  text-secondary py-2 hover:bg-primary hover:text-white hover:border-none"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateEvent;
