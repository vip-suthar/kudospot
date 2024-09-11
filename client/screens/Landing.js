import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, Spin, Typography } from "antd";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getKudosList, likeKudo } from "../utils/api";

const { Text } = Typography;

const Landing = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [kudosData, setKudosData] = useState([]);

  const loadData = async () => {
    const data = await getKudosList();
    setKudosData(data);
    setLoading(false);
  };

  const handlePostLike = async (post_id, add_like) => {
    const data = await likeKudo(post_id, user._id, add_like);
    setKudosData((s) => {
      s = [...s];
      const index = s.findIndex((item) => item._id === post_id);
      if (index !== -1) {
        s[index] = { ...s[index] };

        if (add_like) {
          s[index].likes.push(user._id);
        } else {
          console.log(s, index, s[index]);
          const idx = s[index].likes.findIndex((_id) => _id === user._id);
          if (idx > -1) s[index].likes.splice(idx, 1);
        }
      }
      return s;
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Flex
      vertical
      gap={16}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "16px 5%",
        boxSizing: "border-box",
      }}
    >
      <Text strong style={{ textAlign: "center" }}>
        Welcome {user.username}!
      </Text>
      <Flex justify="end" align="center" gap={8}>
        <Button
          onClick={() => {
            navigate("/analytics");
          }}
        >
          Analytics
        </Button>
        <Button
          type="primary"
          onClick={() => {
            navigate("/givekudo");
          }}
        >
          Give Kudo
        </Button>
      </Flex>
      <Flex
        vertical
        align="center"
        gap={8}
        className="scrollbar-hidden"
        style={{
          minHeight: "calc(100vh - 118px)",
          // height: "calc(100vh - 118px)",
          width: "100%",
          overflow: "auto"
          
        }}
      >
        {loading ? (
          <Spin />
        ) : kudosData.length > 0 ? (
          kudosData.map((kudo) => (
            <Card
              key={kudo._id}
              style={{ width: "100%", height: "max-content" }}
            >
              <Flex align="center" gap={16}>
                <img
                  src={kudo.badge.img_src}
                  alt={kudo.badge.title}
                  style={{ width: 48 }}
                />
                <Text strong>
                  {kudo.from.username} gave "{kudo.badge.title}" Badge to{" "}
                  {kudo.to.username}
                </Text>
              </Flex>
              <Text
                strong
                style={{
                  display: "block",
                  marginTop: 16,
                  width: "80%",
                  textAlign: "center",
                }}
              >
                {kudo.reason}
              </Text>

              {kudo.likes.includes(user._id) ? (
                <HeartFilled
                  style={{
                    position: "absolute",
                    color: "red",
                    bottom: 10,
                    right: 10,
                  }}
                  onClick={() => {
                    handlePostLike(kudo._id, false);
                  }}
                />
              ) : (
                <HeartOutlined
                  style={{ position: "absolute", bottom: 10, right: 10 }}
                  onClick={() => {
                    handlePostLike(kudo._id, true);
                  }}
                />
              )}
            </Card>
          ))
        ) : (
          <Empty />
        )}
      </Flex>
    </Flex>
  );
};

export default Landing;
