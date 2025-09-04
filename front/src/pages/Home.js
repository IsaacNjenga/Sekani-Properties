import React, { useContext } from "react";
import { UserContext } from "../App";
import { Button, Image, Typography } from "antd";
import "../assets/css/home.css";

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

const gridImg1 =
  "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900";
const gridImg2 =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900";
const gridImg3 =
  "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900";

function Home() {
  const { isMobile } = useContext(UserContext);
  return (
    <div style={{}}>
      {/* banner */}
      <div style={{ position: "relative" }}>
        <Image
          src={bgImg}
          alt="bgImg"
          width="100%"
          height={700}
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
      {/* home body */}
      <div>
        <Title>HOW CAN WE HELP?</Title>
        <Title>Explore Our Solutions</Title>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 0,
            justifyContent: "center",
            padding: "0px 10px",
            margin: "0px 10px",
            overflow: "hidden",
          }}
        >
          {[gridImg1, gridImg2, gridImg3].map((img, index) => (
            <div
              style={{
                flex: 1, // all equal initially
                transition: "flex 0.5s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
              className="image-wrapper"
              key={index}
            >
              <img
                src={img}
                alt="img"
                style={{
                  height: 500,
                  width: "100%",
                  transition: "transform 0.4s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Title>HANDPICKED JUST FOR YOU</Title>
        <Title>Featured Listings</Title>
        grid with cards here
        <Button>View All</Button>
      </div>

      <div>
        <Title>WHY CHOOSE US?</Title>
        <Title>More Than A Real Estate Agent</Title>
        Testimonials
      </div>
    </div>
  );
}

export default Home;
