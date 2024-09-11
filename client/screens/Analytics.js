import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
//   BarElement,
// } from "chart.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";
import { Card, Empty, Flex, Spin, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAnalyticsData } from "../utils/api";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

const { Title, Text } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Number of kudos received",
    dataIndex: "kudos",
    key: "kudos",
    width: "50%",
  },
];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const loadData = async () => {
    const data = await getAnalyticsData();
    if (data) {
      console.log(data);
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Flex
      vertical
      align="center"
      justify="space-around"
      style={{ width: "100%" }}
    >
      {loading ? (
        <Spin />
      ) : data ? (
        <>
          <Flex
            gap={16}
            align="center"
            justify="space-around"
            style={{ width: "100%", padding: 32, boxSizing: "border-box" }}
          >
            <Card style={{ width: "50%" }}>
              <Text strong style={{ display: "block", textAlign: "center", marginBottom: 8 }}>
                Kudos Given
              </Text>
              <BarChart
                title="Kudos Given"
                width={500}
                height={300}
                data={data.kudos_given}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="badge.title" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#FF5F5E99"
                  stroke="#FF5F5E"
                  strokeWidth={2}
                />
              </BarChart>
            </Card>
            <Table
              title={() => (
                <Text strong style={{ display: "block", textAlign: "center" }}>
                  Kudos Leaderboard
                </Text>
              )}
              columns={columns}
              dataSource={data.kudos_received.map((item) => ({
                key: item.user._id,
                name: item.user.username,
                kudos: item.count,
              }))}
              size="small"
              pagination={false}
              scroll={{ x: "max-content", y: 240 }}
              tableLayout="auto"
              style={{ width: "45%" }}
            />
          </Flex>
          <Text strong>
            Most Liked post:{" "}
            <Text strong>
              {data.most_liked_post.from.username} gave "
              {data.most_liked_post.badge.title}" Badge to{" "}
              {data.most_liked_post.to.username}
            </Text>
            &nbsp;&minus;&nbsp;
            <Text
              strong
              style={{
                display: "block",
                marginTop: 16,
                width: "80%",
                textAlign: "center",
              }}
            >
              &quot;{data.most_liked_post.reason}&quot;
            </Text>
          </Text>
        </>
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default Analytics;
