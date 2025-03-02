import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/Card";

import useLogin from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, error } = useLogin();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(login({ email: email, password: password }), {
        loading: "Logging in...",
        success: "Login successful!",
        error: "Login failed. Please try again.",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <Card>
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Email address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button mt-2">Login</button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
