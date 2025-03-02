import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/Card";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { signup, error } = useSignup();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        signup({
          email,
          password,
          confirmPassword,
        }),
        {
          loading: "Signing up...",
          success: "Signup successful!",
          error: "Signup failed. Please try again.",
        }
      );

      navigate("/");
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="login">
      <Card>
        <h2>Sign Up</h2>
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
          <label>Confirm password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="button mt-2">Sign up</button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
