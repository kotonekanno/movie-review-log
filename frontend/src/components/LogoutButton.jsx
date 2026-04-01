import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
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