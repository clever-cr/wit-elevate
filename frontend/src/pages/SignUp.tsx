import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { ChangeEvent, useState } from "react";
import { signUp } from "../util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<formData>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    signUp(data).then(() => {
      toast.success("Signed up successfully");
      navigate("/logIn");
    });
  };
  return (
    <div>
      <Header link="Log In" path="/login" text="Already have an acount" />
      <div className="py-44">
        <Form header="Welcome back" />
        <div className="flex flex-col items-center pt-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              value={data.fullName}
              name="fullName"
              placeholder="Enter Full name"
              onChange={handleChange}
            />
            <Input
              value={data.email}
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
            />
            <Input
              type="password"
              value={data.password}
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />

            <Button
              type="submit"
              onClick={handleSubmit}
              text="sign Up"
              className="bg-secondary text-white flex justify-center rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
