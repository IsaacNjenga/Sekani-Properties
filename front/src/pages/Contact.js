import { useContext } from "react";
import Motion from "../components/Motion";
import { Card, Image, Timeline, Typography } from "antd";
import { UserContext } from "../App";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "../assets/css/contact.css";
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
    children: <Text style={textItemStyle}>+254 738 028 200</Text>,
  },
  {
    dot: <EnvironmentOutlined style={iconStyle} />,
    children: (
      <Text style={textItemStyle}>21 Nairobi Street, Westlands, Nairobi</Text>
    ),
  },
];

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
            <Title
              style={{ ...titleStyle, fontSize: isMobile ? 34 : 42 }}
              level={1}
            >
              Get in Touch
            </Title>
            <Paragraph style={subTitleStyle}>
              We’re here to help you find your dream property or answer any
              questions you may have. Reach out anytime.
            </Paragraph>
          </div>
        </div>

        {/* Contact Info */}
        <div
          style={{
            padding: "50px 20px",
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
      </div>
    </Motion>
  );
}

export default Contact;
