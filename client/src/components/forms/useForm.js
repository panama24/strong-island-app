import React from "react";

const resetFormValues = (state) =>
  Object.keys(state).map((k) => ({
    [k]: "",
  }));

const useForm = (formSchema = {}, cb) => {
  const [state, setState] = React.useState(formSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    setDisable(true);
  }, []);

  React.useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]);

  const validateState = React.useCallback(() => {
    const hasError = Object.keys(formSchema).some((key) => {
      const isRequired = formSchema[key].required;
      const value = state[key].value;
      const error = state[key].error;
      return (isRequired && !value) || error;
    });

    return hasError;
  }, [state, formSchema]);

  const onChangeHandler = React.useCallback(
    (event) => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      let error = "";
      if (formSchema[name].required) {
        if (!value) {
          error = "This field is required.";
        }
      }

      if (
        formSchema[name].validator !== null &&
        typeof formSchema[name].validator === "object"
      ) {
        if (value && !formSchema[name].validator.regEx.test(value)) {
          error = formSchema[name].validator.error;
        }
      }

      setState((prevState) => ({
        ...prevState,
        [name]: { error, value },
      }));
    },
    [formSchema]
  );

  const onSubmitHandler = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!validateState()) {
        cb(state);
        resetFormValues(state);
      }
    },
    [state]
  );

  return { disable, onChangeHandler, onSubmitHandler, state };
};

export { useForm };
