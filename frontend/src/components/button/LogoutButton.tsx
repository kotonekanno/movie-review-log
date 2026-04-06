import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout: () => Promise<void> = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 204) {
        console.log("Logged out");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (e) {
      console.error("Logout failed: " + e);
    }
  };

  return <button
    onClick={handleLogout}
    className="cursor-pointer"
  >
    ログアウト
  </button>
}

export default LogoutButton;