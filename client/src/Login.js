import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthHeader from "./components/Auth/AuthHeader";
import AuthForm from "./components/Auth/AuthForm";

const Login = ({ user, login }) => {
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push("/home");
  }, [user, history]);

  return (
    <AuthLayout>
      <AuthHeader
        color='secondary'
        buttonLabel='Don’t have an account?'
        onClick={() => {
          history.push("/register");
        }}
      >
        Create an account
      </AuthHeader>

      <AuthForm
        formTitle='Welcome back!'
        onSubmit={handleLogin}
        onSubmitTitle='Login'
      />
    </AuthLayout>
  );
};

export default Login;
