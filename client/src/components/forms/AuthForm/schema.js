const loginSchema = {
  email: {
    error: "",
    required: true,
    validator: {
      regEx: /^\S+@\S+\.\S+$/,
      error: "Invalid email format",
    },
    value: "",
  },
  password: {
    error: "",
    required: true,
    regEx: "",
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid password format",
    },
    value: "",
  },
  username: {
    error: "",
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid username format",
    },
    value: "",
  },
};

// validators: [isEmail, maxLength, minLength, alphanumeric];
const signupSchema = {
  email: {
    error: "",
    required: true,
    validator: {
      regEx: /^\S+@\S+\.\S+$/,
      error: "Invalid email format",
    },
    value: "",
  },
  password: {
    error: "",
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid password format",
    },
    value: "",
  },
  username: {
    error: "",
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid username format",
    },
    value: "",
  },
};

export { loginSchema, signupSchema };
