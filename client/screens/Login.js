import React, { useState } from "react";
import { Input, Flex, Button, Card, Typography } from "antd";

const { Title } = Typography;

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Card>
      <Flex vertical gap={16} align="center">
        <Title level={1}>Welcome to KudoSpot</Title>
        <Input
          placeholder="Enter your username"
          size="large"
          style={{ width: 300 }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Button
          type="primary"
          style={{ width: 200 }}
          onClick={async () => {
            setLoading(true);
            await handleLogin(username);
            setLoading(false);
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Flex>
    </Card>
  );
};

export default Login;
