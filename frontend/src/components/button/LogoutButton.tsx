import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logout } from "@/api/auth";

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout: () => Promise<void> = async () => {
    try {
      await logout();

      toast.success("ログアウトしました");
      navigate("/login");
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