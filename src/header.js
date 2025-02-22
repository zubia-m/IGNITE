import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4 bg-transparent backdrop-blur-lg z-10">
      <div className="flex space-x-4">
        <Button variant="outlined" sx={{ color: "white", borderColor: "white" }} onClick={() => navigate("/signin")}>
          Sign In
        </Button>
        <a href="/realtors-contractors" className="text-white hover:underline">
          For Realtors/Contractors
        </a>
      </div>
      <div className="text-2xl font-bold drop-shadow-lg text-white">
        IGNITE
      </div>
    </header>
  );
}
