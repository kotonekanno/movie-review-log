import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout: () => Promise<void> = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        localStorage.removeItem("token");

        toast.success("ログアウトしました");
        navigate("/login");
      } else {
        toast.error("ログアウトに失敗しました");
      }
    } catch (e) {
      toast.error("ログアウトに失敗しました");
    }
  };

  return <Button
    onClick={handleLogout}
    variant="ghost"
    className="cursor-pointer text-base"
    style={{ fontFamily: "kaisotai" }}
  >
    ログアウト
  </Button>
}

export default LogoutButton;