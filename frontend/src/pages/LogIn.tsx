import { useState, ChangeEvent } from "react";
import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { logIn } from "../util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formData>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    logIn(formData)
      .then((data: any) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("fullName", data.user.fullName);
        localStorage.setItem("role", data.user.role);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.warn("Invalid Email or Password");
      });
  };

  return (
    <div className="">
      <Header link="Sign Up" path="/signUp" text="Not have an account" />
      <div className="py-44">
        <Form header="Welcome back" />
        <div className="flex flex-col items-center pt-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              value={formData.email}
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
            />
            <Input
              value={formData.password}
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              type="password"
            />

            <Button

              text="sign In"
              type="submit"
              className="bg-secondary text-white flex justify-center rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
