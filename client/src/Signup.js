import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthHeader from "./components/Auth/AuthHeader";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthForm from "./components/Auth/AuthForm";

const Signup = ({ user, register }) => {
  const history = useHistory();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    await register({ username, email, password });
  };

  useEffect(() => {
    if (user && user.id) history.push("/home");
  }, [user, history]);

  return (
    <AuthLayout>
      <AuthHeader
        color="secondary"
        buttonLabel="Already have an account?"
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </AuthHeader>

      <AuthForm
        formTitle="Create an account."
        onSubmit={handleRegister}
        onSubmitTitle="Create"
      >
        <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
          <TextField
            fullWidth
            label="Confirm Password"
            aria-label="confirm password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="confirmPassword"
            required
          />
          <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
        </FormControl>

        <FormControl required fullWidth>
          <TextField
            label="E-mail address"
            aria-label="e-mail address"
            type="email"
            name="email"
          />
        </FormControl>
      </AuthForm>
    </AuthLayout>
  );
};

export default Signup;
