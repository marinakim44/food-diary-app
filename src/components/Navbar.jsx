import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="bg-sky-500 text-white min-h-[50px] flex items-center px-10"
    >
      Navbar TBD
    </div>
  );
}
