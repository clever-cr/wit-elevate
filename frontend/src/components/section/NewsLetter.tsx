import Button from "../ui/Button";

const NewsLetter = () => {
  return (
    <div className="bg-primary flex items-center px-16 py-28 gap-20">
      <div className="text-white flex flex-col gap-6">
        <h3 className="text-4xl font-semibold">
          Stay updated with our Newsletter.
        </h3>
        <p className="text-lg">
          We send all the updates to our subscribers, you can be the part of our
          regulars.{" "}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex item-center gap-4">
          <input placeholder="Enter your Email" className="px-12" />
          <Button text="Subscribe  Now" className="bg-white" />
        </div>
        <p className="text-white">
          By clicking Subscribe Now you're confirming that you agree with our
          Terms and Conditions.
        </p>
      </div>
    </div>
  );
};
export default NewsLetter;
