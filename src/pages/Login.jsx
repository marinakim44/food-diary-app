import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const login = async () => {
    console.log("loging in...");
  };
  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-2xl m-auto">
        <h1 className="text-center font-bold my-5">Login</h1>
        <div className="flex flex-col gap-3 items-center sm:w-1/2 w-full m-auto">
          <input
            placeholder="Email"
            className="border-[1px] border-gray-500 rounded p-2 w-full"
          />
          <div className="w-full">
            <input
              placeholder="Password"
              className="border-[1px] border-gray-500 rounded p-2 w-full"
            />
            <Link to="/reset_password">
              <button className="underline text-gray-700 text-sm italic w-full text-right">
                Forgot password
              </button>
            </Link>
          </div>
          <button
            onClick={login}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Login
          </button>
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
