import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

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
        navigate("/login");
      } else {
        toast.error("ログアウトに失敗しました");
      }
    } catch (e) {
      toast.error("ログアウトに失敗しました");
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