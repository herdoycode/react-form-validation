import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

const Register = () => {
  const data = [
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
    { label: "Re enter password", type: "password", name: "repassword" },
  ];
  const schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    repassword: Joi.string().required().label("Password"),
  };
  return (
    <Form title={"Register"} submit={"Sin in"} form={data} schema={schema} />
  );
};

export default Register;
