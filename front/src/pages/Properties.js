import React, { useContext, useState } from "react";
import Motion from "../components/Motion";
import { Typography, Image, Input } from "antd";
import { UserContext } from "../App";

const { Title, Text } = Typography;
const { Search } = Input;

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
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
  fontSize: 36,
};

const bgImg =
  "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=900";

function Properties() {
  const { isMobile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  return (
    <Motion>
      <div>
        {/* banner */}
        <div style={{ position: "relative" }}>
          <Image
            src={bgImg}
            alt="bgImg"
            width="100%"
            height={isMobile ? 400 : 500}
            preview={false}
            style={{ objectFit: "cover", maxWidth: "100%" }}
          />{" "}
          <div style={{ ...heroStyle }}>
            <Title
              level={3}
              style={{ ...titleStyle, fontSize: isMobile ? 34 : 38 }}
            >
              FIND YOUR PERFECT FIT
            </Title>
            <div>
              <Search
                placeholder="Search..."
                size="large"
                loading={loading}
                enterButton
                style={{ width: isMobile ? 400 : 500, height: 50 }}
              />
            </div>
          </div>
        </div>
        {/* body */}
        <div></div>
      </div>
      
    </Motion>
  );
}

export default Properties;
