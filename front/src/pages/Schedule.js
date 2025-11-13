import React, { useState } from "react";
import {
  Form,
  Button,
  Typography,
  Drawer,
  Card,
  Space,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Alert,
} from "antd";
import {
  CloseOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNotification } from "../contexts/notificationContext";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;

function Schedule({ content, openSchedule, toggleSchedule, isMobile }) {
  const [form] = Form.useForm();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      // Format date and time properly
      const scheduledDate = selectedDate ? selectedDate.toISOString() : null;
      const scheduledTime = selectedTime ? selectedTime.format("HH:mm") : null;

      const allValues = {
        ...values,
        date: scheduledDate,
        time: scheduledTime,
        propertyId: content?._id,
      };

      console.log("Scheduled Viewing:", allValues);

      openNotification(
        "success",
        "Your viewing has been scheduled successfully!",
        "Schedule Confirmed"
      );

      setTimeout(() => {
        toggleSchedule();
        form.resetFields();
        setSelectedDate(null);
        setSelectedTime(null);
      }, 1500);
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        "Please fill in all required fields.",
        "Validation Error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Disable past dates
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <Drawer
      open={openSchedule}
      onClose={toggleSchedule}
      width={isMobile ? "100%" : 650}
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
      {/* Header */}
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
            Book your preferred date and time to visit this property
          </Text>
        </div>
      </div>

      <div style={{ padding: isMobile ? 16 : 24 }}>
        {/* Property Info Card */}
        <Card
          style={{
            borderRadius: 16,
            marginBottom: 24,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            background: "#fff",
          }}
          bodyStyle={{ padding: isMobile ? 16 : 20 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #bdb890, #a8a378)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarOutlined style={{ fontSize: 24, color: "#fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <Text
                strong
                style={{
                  fontSize: 16,
                  fontFamily: "Raleway",
                  color: "#1e293b",
                  display: "block",
                }}
              >
                {content?.propertyType || "Property"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Raleway",
                  color: "#64748b",
                }}
              >
                {content?.address || "N/A"}
              </Text>
            </div>
          </div>
        </Card>

        {/* Info Alert */}
        <Alert
          message="Viewing Guidelines"
          description="Our agent will contact you to confirm the viewing appointment. Please arrive on time and bring a valid ID."
          type="info"
          showIcon
          style={{
            marginBottom: 24,
            borderRadius: 12,
            border: "1px solid #bae7ff",
          }}
        />

        {/* Form */}
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
          style={{
            background: "#fff",
            padding: isMobile ? 20 : 32,
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Personal Information Section */}
          <div style={{ marginBottom: 24 }}>
            <Text
              strong
              style={{
                fontSize: 16,
                fontFamily: "Raleway",
                color: "#1e293b",
                display: "block",
                marginBottom: 16,
              }}
            >
              Your Information
            </Text>

            {/* Full Name */}
            <Form.Item
              label={
                <Space>
                  <UserOutlined style={{ color: "#bdb890" }} />
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Full Name
                  </Text>
                </Space>
              }
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                size="large"
                style={{
                  borderRadius: 10,
                  fontFamily: "Raleway",
                  border: "2px solid #e2e8f0",
                }}
              />
            </Form.Item>

            {/* Email & Phone */}
            <Space.Compact style={{ width: "100%" }} size="large">
              <Form.Item
                label={
                  <Space>
                    <MailOutlined style={{ color: "#bdb890" }} />
                    <Text
                      strong
                      style={{
                        fontSize: 15,
                        fontFamily: "Raleway",
                        color: "#1e293b",
                      }}
                    >
                      Email
                    </Text>
                  </Space>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                style={{
                  width: isMobile ? "100%" : "50%",
                  marginRight: isMobile ? 0 : 12,
                }}
              >
                <Input
                  size="large"
                  style={{
                    borderRadius: 10,
                    fontFamily: "Raleway",
                    border: "2px solid #e2e8f0",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <Space>
                    <PhoneOutlined style={{ color: "#bdb890" }} />
                    <Text
                      strong
                      style={{
                        fontSize: 15,
                        fontFamily: "Raleway",
                        color: "#1e293b",
                      }}
                    >
                      Phone Number
                    </Text>
                  </Space>
                }
                name="phone"
                rules={[{ required: true, message: "Please enter your phone" }]}
                style={{ width: isMobile ? "100%" : "50%" }}
              >
                <Input
                  size="large"
                  style={{
                    borderRadius: 10,
                    fontFamily: "Raleway",
                    border: "2px solid #e2e8f0",
                  }}
                />
              </Form.Item>
            </Space.Compact>
          </div>

          {/* Viewing Details Section */}
          <div style={{ marginBottom: 24 }}>
            <Text
              strong
              style={{
                fontSize: 16,
                fontFamily: "Raleway",
                color: "#1e293b",
                display: "block",
                marginBottom: 16,
              }}
            >
              Viewing Details
            </Text>

            {/* Date */}
            <Form.Item
              label={
                <Space>
                  <CalendarOutlined style={{ color: "#bdb890" }} />
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Preferred Date
                  </Text>
                </Space>
              }
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker
                onChange={handleDateChange}
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  fontFamily: "Raleway",
                  border: "2px solid #e2e8f0",
                }}
                placeholder="Select viewing date"
              />
            </Form.Item>

            {/* Time */}
            <Form.Item
              label={
                <Space>
                  <ClockCircleOutlined style={{ color: "#bdb890" }} />
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Preferred Time (24-hour format)
                  </Text>
                </Space>
              }
              name="time"
              rules={[{ required: true, message: "Please select a time" }]}
            >
              <TimePicker
                onChange={handleTimeChange}
                format="HH:mm"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  fontFamily: "Raleway",
                  border: "2px solid #e2e8f0",
                }}
                placeholder="Select viewing time"
                minuteStep={15}
              />
            </Form.Item>

            {/* Number of People */}
            <Form.Item
              label={
                <Space>
                  <TeamOutlined style={{ color: "#bdb890" }} />
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Number of People Attending
                  </Text>
                </Space>
              }
              name="numberOfPeople"
              initialValue={1}
              rules={[
                {
                  required: true,
                  message: "Please select number of attendees",
                },
              ]}
            >
              <Select
                size="large"
                style={{
                  borderRadius: 10,
                  fontFamily: "Raleway",
                }}
                options={[
                  { label: "Just me", value: 1 },
                  { label: "2 people", value: 2 },
                  { label: "3 people", value: 3 },
                  { label: "4 people", value: 4 },
                  { label: "5+ people", value: 5 },
                ]}
              />
            </Form.Item>

            {/* Additional Notes */}
            <Form.Item
              label={
                <Space>
                  <MessageOutlined style={{ color: "#bdb890" }} />
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Additional Notes (Optional)
                  </Text>
                </Space>
              }
              name="notes"
            >
              <TextArea
                placeholder="Any special requests or questions? (e.g., parking requirements, specific areas of interest)"
                rows={4}
                maxLength={300}
                showCount
                style={{
                  borderRadius: 10,
                  fontFamily: "Raleway",
                  border: "2px solid #e2e8f0",
                  fontSize: 15,
                  resize: "none",
                }}
              />
            </Form.Item>
          </div>

          {/* Summary Display */}
          {selectedDate && selectedTime && (
            <Card
              size="small"
              style={{
                background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                border: "none",
                borderRadius: 12,
                marginBottom: 24,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <Text
                strong
                style={{
                  fontFamily: "Raleway",
                  color: "#065f46",
                  display: "block",
                  marginBottom: 8,
                  fontSize: 14,
                }}
              >
                📅 Your Scheduled Viewing:
              </Text>
              <Space direction="vertical" size={4}>
                <Text style={{ fontFamily: "Raleway", color: "#047857" }}>
                  <strong>Date:</strong>{" "}
                  {selectedDate.format("dddd, MMMM D, YYYY")}
                </Text>
                <Text style={{ fontFamily: "Raleway", color: "#047857" }}>
                  <strong>Time:</strong> {selectedTime.format("HH:mm")} (24-hour
                  format)
                </Text>
                <Text
                  style={{
                    fontFamily: "Raleway",
                    color: "#047857",
                    fontSize: 12,
                  }}
                >
                  ISO DateTime:{" "}
                  {dayjs(selectedDate)
                    .hour(selectedTime.hour())
                    .minute(selectedTime.minute())
                    .toISOString()}
                </Text>
              </Space>
            </Card>
          )}

          {/* Submit Buttons */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                style={{
                  background: "linear-gradient(135deg, #bdb890, #a8a378)",
                  border: "none",
                  borderRadius: 12,
                  height: 50,
                  fontFamily: "Raleway",
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: "0 4px 16px rgba(189, 184, 144, 0.4)",
                }}
              >
                {loading ? "Scheduling..." : "Confirm Viewing"}
              </Button>
              <Button
                size="large"
                block
                onClick={toggleSchedule}
                style={{
                  borderRadius: 12,
                  height: 50,
                  fontFamily: "Raleway",
                  fontWeight: 600,
                  fontSize: 16,
                  border: "2px solid #e2e8f0",
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}

export default Schedule;
