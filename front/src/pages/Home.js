import React, { useContext } from "react";
import { UserContext } from "../App";
import { Button, Image, Typography } from "antd";

const { Title } = Typography;

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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#fff",
            padding: "0 20px",
          }}
        >
          <Title
            level={3}
            style={{
              color: "#fff",
              fontFamily: "Alegreya Sans",
              textAlign: "center",
              fontWeight: 400,
              letterSpacing: 2,
              fontSize: 38,
            }}
          >
            YOUR HOME MADE SIMPLE
          </Title>
          <Title
            level={2}
            style={{
              marginTop: 15,
              color: "#fff",
              fontFamily: "Alegreya Sans",
              fontWeight: 300,
              textAlign: "center",
              width: "65%",
              fontSize: 36,
            }}
          >
            Experience seamless real estate with Sekani. Discover dream homes,
            lucrative investments, and unforgettable stays.
          </Title>
          <div style={{ marginTop: 25, display: "flex", gap: 15 }}>
            <Button
              type="primary"
              style={{
                background: "#919075",
                borderRadius: 18,
                fontSize: 16,
                fontFamily: "Raleway",
                fontWeight: 400,
                padding: "0 25px",
                height: 40,
                border: "none",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(0,0,0,0.3)"
                  : "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              View Properties
            </Button>
            <Button
              style={{
                color: "#fff",
                background: "rgba(0,0,0,0)",
                borderRadius: 18,
                fontSize: 16,
                fontFamily: "Raleway",
                fontWeight: 400,
                padding: "0 25px",
                height: 40,
                boxShadow: darkMode
                  ? "0 4px 12px rgba(0,0,0,0.3)"
                  : "0 4px 12px rgba(0,0,0,0.15)",
                border: "2px solid #fff",
              }}
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
