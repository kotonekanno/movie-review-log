import AuthForm from "../../components/AuthForm"

function RegisterPage() {
  const handleRegister = async ({ email, password }) => {
    try {
      const res = await fetch(`http://localhost:8080/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password })
      });

      if (res.ok) {
        alert("Registeration succeded!");
        // ログイン画面に遷移
      } else {
        alert("Registeration failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error occured");
    }
  };

  return (
    <div>
      <h1>新規登録</h1>
      <AuthForm onSubmit={handleRegister} buttonText="登録" />
    </div>
  );
}

export default RegisterPage;