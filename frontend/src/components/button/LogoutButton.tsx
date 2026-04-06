import { useNavigate } from "react-router-dom";



function LogoutButton() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogout: () => Promise<void> = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 204) {
        alert("Logged out");
        navigate("/login");
      } else {
        alert("Logout failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error occured");
    }
  };

  return <button onClick={handleLogout}>ログアウト</button>
}

export default LogoutButton;