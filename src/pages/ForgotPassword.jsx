import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { forgotPassword } from "../auth/forgotPassword";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    console.log("resetting password...");
    forgotPassword(email)
      .then((response) => {
        console.log("response", response);
        alert("Password reset email sent");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-2xl m-auto">
        <h1 className="text-center font-bold my-5">Get password reset code</h1>
        <div className="flex flex-col gap-3 items-center sm:w-1/2 w-full m-auto">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1px] border-gray-500 rounded p-2 w-full"
          />
          <button
            onClick={resetPassword}
            className="bg-green-500 text-white p-2 rounded w-full mt-5"
          >
            Send password reset email
          </button>
          <Link to="/login" className="w-full">
            <button className="border-[1px] border-gray-500 rounded p-2 w-full">
              Login
            </button>
          </Link>
          <Link to="/register" className="w-full">
            <button className="border-[1px] border-gray-500 rounded p-2 w-full">
              Create account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
