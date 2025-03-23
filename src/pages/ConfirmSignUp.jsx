import { useState } from "react";
import Navbar from "../components/Navbar";
import { confirmSignUp } from "../auth/confirmSignUp";
import { useNavigate } from "react-router-dom";

export default function ConfirmSignUp() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const confirmEmail = async () => {
    console.log("confirming email...");
    confirmSignUp(email, verificationCode)
      .then((response) => {
        console.log("response", response);
        alert("Email confirmed");
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-2xl m-auto">
        <h1 className="text-center my-5 font-bold">
          Input your email and verification we sent to your email
        </h1>
        {error && <p className="text-red-500 text-sm italic mb-2">{error}</p>}
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[1px] border-gray-500 rounded p-2 w-full mb-2"
        />
        <input
          placeholder="Verification code"
          type="number"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="border-[1px] border-gray-500 rounded p-2 w-full mb-5"
        />
        <button
          className="bg-green-500 text-white p-2 rounded w-full"
          onClick={confirmEmail}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
