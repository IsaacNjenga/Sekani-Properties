import { useContext, useState } from "react";
import Motion from "../components/Motion";
import { Button, Card, Form, Image, Input, Timeline, Typography } from "antd";
import { UserContext } from "../App";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import "../assets/css/contact.css";
import SplitText from "../components/SplitText";
import Swal from "sweetalert2";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

const bgImg =
  "https://plus.unsplash.com/premium_photo-1661679385591-d51b10ebf581?w=900";

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.25))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "0 20px",
  color: "#fff",
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 600,
  letterSpacing: 2,
  fontSize: 42,
};

const subTitleStyle = {
  marginTop: 16,
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 400,
  fontSize: 20,
  maxWidth: 600,
};

const iconStyle = {
  fontSize: 20,
  color: "#fff",
  background: "#8d8009",
  borderRadius: "50%",
  padding: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
};

const textItemStyle = {
  color: "#333",
  fontFamily: "Raleway",
  fontSize: 18,
  margin: 10,
};

const inputStyle = {
  background: "#fff",
  border: "1px solid #8d8009",
  borderRadius: 6,
  fontSize: 16,
  color: "#333",
  fontFamily: "Raleway",
};

const items = [
  {
    dot: <MailOutlined style={iconStyle} />,
    children: (
      <a
        href="mailto:Info@realestate.co.ke"
        target="_blank"
        rel="noopener noreferrer"
        style={textItemStyle}
      >
        Info@realestate.co.ke
      </a>
    ),
  },
  {
    dot: <PhoneOutlined style={iconStyle} />,
    children: (
      <a
        href="tel:+254738028200"
        target="_blank"
        rel="noopener noreferrer"
        style={textItemStyle}
      >
        +254 738 028 200
      </a>
    ),
  },
  {
    dot: <EnvironmentOutlined style={iconStyle} />,
    children: (
      <Text style={textItemStyle}>21 Nairobi Street, Westlands, Nairobi</Text>
    ),
  },
  {
    dot: <WhatsAppOutlined style={iconStyle} />,
    children: (
      <a
        href="https://wa.me/254738028200"
        target="_blank"
        rel="noopener noreferrer"
        style={textItemStyle}
      >
        +254 738 028 200
      </a>
    ),
  },
];

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);

      if (!values.full_name || !values.email_address || !values.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All fields are required",
        });
        setLoading(false);
        return;
      } else {
        const res = await axios.post("create-mail", values);
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Your message has been sent successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 700,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        borderRadius: 16,
        padding: "30px 20px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Title
          level={3}
          style={{ fontFamily: "Alegreya Sans", marginBottom: 0 }}
        >
          Your Needs Matter
        </Title>
        <Text type="secondary" style={{ fontFamily: "Raleway", fontSize: 18 }}>
          Write to us and we'll get you started
        </Text>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item label="" name="full_name" required>
          <Input placeholder="Your full name" style={inputStyle} />
        </Form.Item>
        <Form.Item
          label=""
          name="email_address"
          required
          extra="We'll use this email to contact you"
        >
          <Input placeholder="Email address" type="email" style={inputStyle} />
        </Form.Item>
        <Form.Item label="" name="message" required>
          <Input.TextArea
            rows={5}
            placeholder="Message"
            style={{ ...inputStyle, height: "auto" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={loading}
            style={{ background: "#8d8009" }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

function Contact() {
  const { isMobile } = useContext(UserContext);

  return (
    <Motion>
      <div style={{ background: "#fafafa" }}>
        {/* Hero Section */}
        <div style={{ position: "relative" }}>
          <Image
            src={bgImg}
            alt="bgImg"
            width="100%"
            height={isMobile ? 600 : 500}
            preview={false}
            style={{ objectFit: "cover", maxWidth: "100%" }}
          />
          <div style={heroStyle}>
            <SplitText
              text={
                <Title
                  style={{ ...titleStyle, fontSize: isMobile ? 34 : 42 }}
                  level={1}
                >
                  Get in Touch
                </Title>
              }
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <Paragraph style={subTitleStyle}>
              We’re here to help you find your dream property or answer any
              questions you may have. Reach out anytime.
            </Paragraph>
          </div>
        </div>

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 5,
            justifyContent: "space-around",
            background:
              "linear-gradient(to top, #8c7f02 0%, #f0ebd4 33%, #f0ebd4 66%, #8c7e02b3 100%)",
            padding: 18,
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "50%",
              padding: "50px 10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              hoverable={!false}
              style={{
                maxWidth: 700,
                width: "100%",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                borderRadius: 16,
                padding: "30px 20px",
                textAlign: "center",
              }}
            >
              <Title
                level={3}
                style={{ fontFamily: "Alegreya Sans", marginBottom: 30 }}
              >
                Reach out to us any time
              </Title>
              <Timeline
                items={items}
                mode={isMobile ? "left" : "alternate"}
                style={{ marginTop: 20 }}
                className="custom-timeline"
              />
            </Card>
          </div>
          <div
            style={{
              width: isMobile ? "100%" : "50%",
              padding: "50px 10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </Motion>
  );
}

export default Contact;
