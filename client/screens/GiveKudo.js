import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { addKudo, getBadgesList, getUsersList } from "../utils/api";
import { useNavigate } from "react-router-dom";

const GiveKudo = ({ user }) => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([
    {
      _id: "user123",
      username: "John",
    },
  ]);
  const [badgeList, setBadgeList] = useState([
    { _id: "badge123", title: "Badge 1", img_src: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const giveKudo = async (to, badge_id, reason) => {
    setLoading(true);
    const data = await addKudo(user._id, to, badge_id, reason);
    if (data) {
      console.log(data);
      navigate("/", { kudo: data });
    }
    setLoading(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    giveKudo(values.to, values.badge_id, values.reason);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const loadData = async () => {
    console.log(user);
    const users = await getUsersList(user._id);
    const badges = await getBadgesList();
    setUsersList(users);
    setBadgeList(badges);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Card style={{ width: 300 }}>
      <Form
        name="basic"
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="to"
          rules={[
            {
              required: true,
              message: "Please select a user!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select the user you want to give kudos to"
            optionFilterProp="label"
            allowClear
            onSearch={onSearch}
            style={{
              width: "100%",
            }}
            //   onChange={handleChange}
            options={usersList.map((user) => ({
              value: user._id,
              label: user.username,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="badge_id"
          rules={[
            {
              required: true,
              message: "Please select a badge!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select the badge you want to give"
            optionFilterProp="label"
            allowClear
            onSearch={onSearch}
            style={{
              width: "100%",
            }}
            //   onChange={handleChange}
            options={badgeList.map((badge) => ({
              value: badge._id,
              label: badge.title,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="reason"
          rules={[
            {
              required: true,
              message: "Please input the reason",
            },
          ]}
        >
          <Input placeholder="Reason for kudos" allowClear />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Give Kudos
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default GiveKudo;
