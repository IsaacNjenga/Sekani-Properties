import { Image, Typography } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../App";
import Motion from "../components/Motion";

const { Title, Paragraph } = Typography;
const bgImg =
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg";

const img1 =
  "https://images.pexels.com/photos/3288102/pexels-photo-3288102.png";
const img2 = "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg";

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

const imgStyle = {
  width: "100%",
  objectFit: "cover",
  borderRadius: 14,
  transition: "transform 0.4s ease",
  border: "2px solid #918f76",
};

const paragraphStyle = {
  fontFamily: "Raleway",
  fontSize: 20,
  textAlign: "justify",
};

const title2 = {
  fontFamily: "Alegreya Sans",
  fontSize: "2.6rem",
  letterSpacing: 2,
};

function About() {
  const { isMobile } = useContext(UserContext);
  return (
    <Motion>
      <div style={{ background: "whitesmoke" }}>
        <div style={{ position: "relative" }}>
          <Image
            src={bgImg}
            alt="bgImg"
            width="100%"
            height={isMobile ? 900 : 700}
            preview={false}
            style={{ objectFit: "cover", maxWidth: "100%" }}
          />{" "}
          <div style={{ ...heroStyle }}>
            <Title
              level={3}
              style={{ ...titleStyle, fontSize: isMobile ? 34 : 38 }}
            >
              ABOUT US
            </Title>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 15,
            margin: 10,
            padding: 20,
          }}
        >
          <div
            style={{
              alignItems: "center",
              textAlign: "center",
              padding: 12,
              borderRadius: 14,
            }}
          >
            <Title style={title2}>Sekani Real Estate</Title>
            <Paragraph style={paragraphStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
            <Image
              preview={false}
              src={img1}
              alt="img_1"
              height={350}
              style={imgStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>
          <div
            style={{
              gap: 10,
              textAlign: "center",
            }}
          >
            <Image
              preview={false}
              src={img2}
              alt="img_2"
              height={350}
              style={imgStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />

            <Title style={title2}>Your Home Made Simple</Title>
            <Paragraph style={paragraphStyle}>
              Un ed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem
            </Paragraph>
          </div>
        </div>
      </div>
    </Motion>
  );
}

export default About;
