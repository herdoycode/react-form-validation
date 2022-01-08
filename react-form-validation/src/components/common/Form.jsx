import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./Input";

const prepareData = (form) => {
  return form.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

const Form = ({ form, title, submit, schema }) => {
  const [data, setData] = useState(prepareData(form));
  const [errors, setErrors] = useState({});

  const validate = () => {
    const option = { abortEarly: false };
    const result = Joi.validate(data, schema, option);
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
  };

  const handleChange = ({ target: input }) => {
    const errorsClone = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsClone[input.name] = errorMessage;
    else delete errorsClone[input.name];
    setErrors(errorsClone);

    const dataClone = { ...data };
    dataClone[input.name] = input.value;
    setData(dataClone);
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaAuth = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaAuth);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if (error) return;
    console.log("Submited");
  };

  return (
    <>
      <h1> {title} </h1>
      <form onSubmit={handleSubmit}>
        {form.map(({ label, type, name }) => (
          <Input
            key={name}
            label={label}
            type={type}
            name={name}
            value={data[name]}
            onChange={handleChange}
            error={errors[name]}
          />
        ))}

        <button type="submit" className="btn btn-primary">
          {submit}
        </button>
      </form>
    </>
  );
};

Form.defaultProps = {
  form: [
    { label: "Username", type: "text", name: "username" },
    { label: "Password", type: "password", name: "password" },
  ],
};

export default Form;
