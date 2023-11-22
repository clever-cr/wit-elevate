import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
const LogIn = () => {
  return (
    <div className="">
      <Header link="Sign Up" path="/signUp" text="Not have an account" />
      <div className="py-44">
        <Form header="Welcome back" />
        <div className="flex flex-col items-center pt-8">
          <form className="flex flex-col gap-4">
            <Input placeholder="Enter email address" />
            <Input placeholder="Enter password" />
            <Button
              text="sign In"
              className="bg-secondary text-white flex justify-center rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
