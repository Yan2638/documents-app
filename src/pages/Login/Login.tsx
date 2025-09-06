import { useState } from "react";
import { Button, Input, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/documents");
    } else {
      messageApi.error("Wrong password or username");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {contextHolder}

      <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color--heavy)] text-center">
          Sign In
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-5">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-3 px-4 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 px-4 rounded-lg"
              onPressEnter={handleLogin}
            />
          </div>

          <Button
            block
            htmlType="submit"
            className="!bg-[var(--primary-color)] !hover:!bg-[var(--primary-color--medium)] !text-white !border-none font-semibold py-3 rounded-lg shadow-md"
          >
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
}
