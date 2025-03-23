import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../auth/getUser";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        console.log("response", response);
        setUser(response);
      })
      .catch((error) => {
        console.log("get user error", error);
        navigate("/login");
      });
  }, []);

  const deleteAccount = () => {
    // TODO: write Lambda function to delete user account and records
    console.log("deleting account...");
  };

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="font-bold text-center">My Profile</h1>
        <div className="mt-5 text-sm">
          <p>
            <span className="font-bold">Your email:</span> {user?.email}
          </p>
          <button
            className="bg-amber-500 text-white rounded p-2 mt-5"
            onClick={deleteAccount}
          >
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
