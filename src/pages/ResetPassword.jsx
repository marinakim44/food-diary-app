import Navbar from "../components/Navbar";
import { resetPassword } from "../auth/resetPassword";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const resetPasswordHandler = async () => {
    console.log("resetting password...");
    resetPassword(email, verificationCode, newPassword)
      .then((response) => {
        console.log("response", response);
        alert("Password changed, you can login ");
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-2xl m-auto">
        <h1 className="text-center font-bold my-5">Set new password</h1>
        {error && <p className="text-red-500 text-sm italic mb-2">{error}</p>}
        <div className="flex flex-col gap-3 items-center sm:w-1/2 w-full m-auto">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1px] border-gray-500 rounded p-2 w-full"
          />
          <input
            placeholder="Verification code"
            type="number"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="border-[1px] border-gray-500 rounded p-2 w-full"
          />
          <input
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-[1px] border-gray-500 rounded p-2 w-full"
            type="password"
          />
          <button
            onClick={resetPasswordHandler}
            className="bg-green-500 text-white p-2 rounded w-full mt-5"
          >
            Send password reset email
          </button>
        </div>
      </div>
    </div>
  );
}
