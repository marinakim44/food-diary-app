import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../auth/getUser";
import { logout } from "../auth/signOut";

export default function Navbar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log("get user error", err);
      });
  }, []);

  const logoutUser = () => {
    console.log("logging out...");
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-sky-500 text-white min-h-[50px] flex items-center justify-between px-5">
      <div id="logo" className="font-bold" onClick={() => navigate("/")}>
        Logo
      </div>
      <div>
        {user && user.email_verified && (
          <div className="flex items-center gap-5">
            <button onClick={logoutUser}>Logout</button>
            <div
              onClick={() => navigate("/my_profile")}
              className="w-10 h-10 rounded-full bg-sky-200 border-2 border-white"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
