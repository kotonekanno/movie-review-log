import AuthForm from "../../components/AuthForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const params = new URLSearchParams();
      params.append("username", email); // ←ここ重要
      params.append("password", password);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: params,
      });

      if (res.ok) {
        alert("Login succeeded!");
        navigate("/home");
      } else {
        alert("Login failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error occured");
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <AuthForm onSubmit={handleLogin} buttonText="ログイン" />
    </div>
  );
}

export default LoginPage;