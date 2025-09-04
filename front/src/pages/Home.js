import React, { useContext } from "react";
import { UserContext } from "../App";
import { Button, Image, Typography } from "antd";

const { Title } = Typography;

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "#fff",
  padding: "0 20px",
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Alegreya Sans",
  textAlign: "center",
  fontWeight: 400,
  letterSpacing: 2,
  fontSize: 38,
};

const subTitleStyle = {
  marginTop: 15,
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 300,
  textAlign: "center",
  width: "65%",
  fontSize: 36,
};

const ctaBtn1Style = {
  background: "#919075",
  borderRadius: 18,
  fontSize: 16,
  fontFamily: "Raleway",
  fontWeight: 400,
  padding: "0 25px",
  height: 40,
  border: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  cursor: "pointer",
};

const ctaBtn2Style = {
  color: "#fff",
  background: "rgba(0,0,0,0)",
  borderRadius: 18,
  fontSize: 16,
  fontFamily: "Raleway",
  fontWeight: 400,
  padding: "0 25px",
  height: 40,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  border: "2px solid #fff",
  cursor: "pointer",
};

const bgImg =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900";

function Home() {
  const { darkMode } = useContext(UserContext);
  return (
    <div style={{}}>
      <div style={{ position: "relative" }}>
        <Image
          src={bgImg}
          alt="bgImg"
          width="100%"
          height={500}
          preview={false}
          style={{ objectFit: "cover" }}
        />{" "}
        <div style={heroStyle}>
          <Title level={3} style={titleStyle}>
            YOUR HOME MADE SIMPLE
          </Title>
          <Title level={2} style={subTitleStyle}>
            Experience seamless real estate with Sekani. Discover dream homes,
            lucrative investments, and unforgettable stays.
          </Title>
          <div style={{ marginTop: 25, display: "flex", gap: 15 }}>
            <Button
              type="primary"
              style={ctaBtn1Style}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              View Properties
            </Button>
            <Button
              style={ctaBtn2Style}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
