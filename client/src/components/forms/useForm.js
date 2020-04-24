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
      const fieldName = formSchema[name];

      let error = "";
      if (fieldName.required && !value) {
        error = "This field is required.";
      }

      if (fieldName.validators.length > 0) {
        if (fieldName.validators.some((v) => !v(value))) {
          error = fieldName.errorMsg;
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
