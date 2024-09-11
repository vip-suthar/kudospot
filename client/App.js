import { App as AntdApp, Flex } from "antd";
import React, { useEffect, useState } from "react";
import Login from "./screens/Login";
import Landing from "./screens/Landing";
import GiveKudo from "./screens/GiveKudo";
import Analytics from "./screens/Analytics";
import { Route, Routes, useNavigate } from "react-router-dom";
import { login } from "./utils/api";

const App = () => {
  const { message } = AntdApp.useApp();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (username) => {
    const result = await login(username);
    if (result) {
      setUser(result);
      message.success("login successful");
    } else {
      message.error("login failed");
    }
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <Flex
      align="center"
      justify="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Landing user={user} />} />
            <Route path="/givekudo" element={<GiveKudo user={user} />} />
            <Route path="/analytics" element={<Analytics />} />
          </>
        ) : (
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
        )}
      </Routes>
    </Flex>
  );
};

export default App;
