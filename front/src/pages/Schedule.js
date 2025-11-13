import React, { useState } from "react";
import { Form, Button, Typography, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNotification } from "../contexts/notificationContext";

const { Title, Text } = Typography;

function Schedule({ content, openSchedule, toggleSchedule, isMobile }) {
  const [form] = Form.useForm();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const allValues = { ...values };
      console.log(allValues);

      openNotification(
        "success",
        "Your feedback is highly appreciated",
        "Thank you!"
      );

      setTimeout(() => {
        toggleSchedule();
        form.resetFields();
      }, 1500);
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        "Try again or contact us.",
        "Something went wrong..."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Drawer
        open={openSchedule}
        onClose={toggleSchedule}
        width={isMobile ? "100%" : 700}
        placement="right"
        closeIcon={null}
        styles={{
          header: {
            background: "linear-gradient(135deg, #bdb890, #a8a378)",
            border: "none",
            padding: 0,
          },
          body: {
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            padding: 0,
          },
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #bdb890, #a8a378)",
            padding: isMobile ? "24px 20px" : "32px 32px 24px",
            position: "relative",
          }}
        >
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={toggleSchedule}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
              fontSize: 20,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "50%",
              zIndex: 10,
            }}
          />

          <div style={{ paddingRight: 40 }}>
            <Title
              level={3}
              style={{
                color: "#fff",
                margin: 0,
                marginBottom: 8,
                fontFamily: "Raleway",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Schedule a Viewing
            </Title>
            <Text
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 15,
                fontFamily: "Raleway",
              }}
            >
              Schedule your preferred date and time for the viewing
            </Text>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Schedule;
