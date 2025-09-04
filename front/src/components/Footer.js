import React, { useContext } from "react";
import logo from "../assets/images/logo3.png";
import { Typography } from "antd";
import {
  InstagramFilled,
  FacebookFilled,
  XOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";

const iconStyle = { fontSize: 30 };

const { Title, Paragraph } = Typography;

function FooterContent() {
  const { isMobile } = useContext(UserContext);
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: 10,
          flexDirection: isMobile ? "column" : "row",
          gap: 20,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              border: "2px solid #dcd8bb",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        {/* about the company */}
        <div>
          <Title
            level={4}
            style={{ color: "#dcd8bb", fontFamily: "Alegreya Sans" }}
          >
            About Sekani
          </Title>
          <Paragraph
            style={{ maxWidth: 400, color: "#fff", fontFamily: "Raleway" }}
          >
            Sekani is a cutting-edge real estate platform dedicated to making
            property transactions seamless and efficient. Whether you're looking
            to buy, sell, rent, or invest, Sekani provides the tools and
            resources you need to make informed decisions in the real estate
            market.
          </Paragraph>
          <div
            style={{
              display: "flex",
              gap: 15,
              marginTop: 10,
              justifyContent: "left",
            }}
          >
            {[
              {
                icon: <InstagramFilled style={iconStyle} />,
                label: "Instagram",
                color: "#fff",
                link: "https://www.instagram.com/",
              },
              {
                icon: <FacebookFilled style={iconStyle} />,
                label: "Facebook",
                color: "#fff",
                link: "https://www.facebook.com/",
              },
              {
                icon: <XOutlined style={iconStyle} />,
                label: "Twitter",
                color: "#fff",
                link: "https://twitter.com/",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  padding: "8px 8px",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontWeight: 500,
                  color: item.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: item.color,
                  }}
                >
                  {item.icon}
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* contact */}

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            //width: 300,
          }}
        >
          <Title
            level={4}
            style={{ color: "#dcd8bb", fontFamily: "Alegreya Sans" }}
          >
            Contact Us
          </Title>

          {[
            {
              icon: <EnvironmentOutlined style={{ fontSize: 20 }} />,
              label: "21 Nairobi, Kenya",
              color: "#fff",
            },
            {
              icon: <PhoneOutlined style={{ fontSize: 20 }} />,
              label: "+254 712 345 678",
              color: "#fff",
            },
            {
              icon: <MailOutlined style={{ fontSize: 20 }} />,
              label: (
                <a
                  href="mailto:info@sekani.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  info@sekani.com
                </a>
              ),
              color: "#fff",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                color: item.color,
              }}
            >
              <span
                style={{
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  padding: 6,
                }}
              >
                {item.icon}
              </span>
              <span style={{ fontFamily: "Raleway" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterContent;
