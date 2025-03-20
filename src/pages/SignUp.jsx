import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { signUp } from "../auth/signUp";

export default function SignUp() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState();
  const [error, setError] = useState();

  const register = async () => {
    console.log("registering...", newUser);

    // check if passwords match
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // check if email is in correct format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(newUser.email)) {
      setError("Email format is invalid");
      return;
    }

    if (!newUser.email || !newUser.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await signUp(newUser.email, newUser.password);
      console.log("Cognito signup response", response);
      alert("You successfully created an account");
      setError("");
      setNewUser({});
      navigate("/login");
    } catch (err) {
      console.error("Cognito signup error", err);
      setError(err.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-2xl m-auto">
        <h1 className="text-center font-bold my-5">Register</h1>
        {error && (
          <div className="text-red-500 italic text-left py-2 rounded text-center text-sm">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-3 items-center sm:w-1/2 w-full m-auto">
          <input
            placeholder="Email"
            className="border-[1px] border-gray-500 rounded p-2 w-full"
            value={newUser?.email || ""}
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value });
              setError("");
            }}
            type="email"
          />
          <input
            placeholder="Password"
            className="border-[1px] border-gray-500 rounded p-2 w-full"
            value={newUser?.password || ""}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
              setError("");
            }}
            type="password"
          />
          <input
            placeholder="Confirm password"
            className="border-[1px] border-gray-500 rounded p-2 w-full"
            value={newUser?.confirmPassword || ""}
            onChange={(e) => {
              setNewUser({ ...newUser, confirmPassword: e.target.value });
              setError("");
            }}
            type="password"
          />
          <button
            onClick={register}
            className="bg-green-500 text-white p-2 rounded w-full mt-5"
          >
            Create account
          </button>
          <Link to="/login" className="w-full">
            <button className="border-[1px] border-gray-500 rounded p-2 w-full">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
