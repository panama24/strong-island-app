const isDefined = (value) => !!value && value !== undefined;

const isValidEmail = (value) => {
  const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return isDefined(value) && regEx.test(value);
};

const maxLength = (value, length) =>
  isDefined(value) && value.length > 0 && value.length <= length;

const minLength = (value, length) =>
  isDefined(value) && value.length > 0 && value.length >= length;

const isValidPassword = (value) => {
  // min 8, max 15, one upper, one lower, one special, one number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
  return isDefined(value) && regex.test(value);
};

export { isDefined, isValidEmail, isValidPassword, maxLength, minLength };
