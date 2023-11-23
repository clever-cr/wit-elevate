import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { useState } from "react";

const SignUp = () => {
  return (
    <div>
      <Header link="Log In" path="/login" text="Already have an acount" />
      <div className="py-44">
        <Form header="Welcome back" />
        <div className="flex flex-col items-center pt-8">
          <form className="flex flex-col gap-4" onSubmit={() => {}}>
            <Input
              value={""}
              name="full Name"
              placeholder="Enter email address"
              onChange={() => {}}
            />
            <Input
              value={""}
              name="email"
              placeholder="Enter email address"
              onChange={() => {}}
            />
            <Input
              value={""}
              name="password"
              placeholder="Enter password"
              onChange={() => {}}
            />

            <Button
              onClick={() => {}}
              text="sign In"
              className="bg-secondary text-white flex justify-center rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
