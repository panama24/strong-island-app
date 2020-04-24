import { isValidEmail, isValidPassword } from "../validators";

const loginSchema = {
  email: {
    error: "",
    errorMsg: "Invalid email format.",
    required: true,
    validators: [isValidEmail],
    value: "",
  },
  password: {
    error: "",
    errorMsg: "Invalid password format.",
    required: true,
    regEx: "",
    validators: [isValidPassword],
    value: "",
  },
  username: {
    error: "",
    errorMsg: "Invalid username format.",
    required: true,
    validators: [],
    value: "",
  },
};

const signupSchema = {
  email: {
    error: "",
    errorMsg: "Invalid email format.",
    required: true,
    validators: [isValidEmail],
    value: "",
  },
  password: {
    error: "",
    errorMsg: "Invalid password format.",
    required: true,
    validators: [isValidPassword],
    value: "",
  },
  username: {
    error: "",
    errorMsg: "Invalid username format.",
    required: true,
    validators: [],
    value: "",
  },
};

export { loginSchema, signupSchema };
