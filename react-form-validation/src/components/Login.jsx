import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";

const Login = () => {
  const data = [
    { label: "Username", type: "text", name: "username" },
    { label: "Password", type: "password", name: "password" },
  ];
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  return <Form title={"Login"} submit={"Login"} schema={schema} form={data} />;
};

export default Login;
