import { CalendarOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Text } = Typography;

function MySchedules() {
  return (
    <div style={{ padding: 0 }}>
      <div style={{ marginBottom: 24, padding: "0 20px" }}>
        <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 8 }}>
          <span>My Schedules</span>
          <CalendarOutlined style={{ color: "green", marginLeft: 8 }} />
        </Title>
        <Text style={{ color: "#64748b", fontSize: 15 }}>
          View all your booked and upcoming schedules
        </Text>
      </div>
    </div>
  );
}

export default MySchedules;
