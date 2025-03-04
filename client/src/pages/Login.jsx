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
        <h2 className="text-xl font-semibold text-primaryText dark:text-darkPrimaryText">
          Login
        </h2>
        <form className="mt-2 space-y-2" onSubmit={handleFormSubmit}>
          <div>
            <label>Email address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="button">Login</button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
