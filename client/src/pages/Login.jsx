import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    setEmail("");
    setPassword("");
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email: </label>
      <input
        type="email"
        name="email"
        placeholder="example@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password: </label>
      <input
        type="password"
        name="password"
        placeholder="Password should be min 8 characters, should contain min 1 lowercase, 1 uppercase letter and min 1 symbol!"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
