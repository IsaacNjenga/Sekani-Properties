import { Carousel, Typography } from "antd";
import { useUser } from "../contexts/UserContext";
import SplitText from "./SplitText";

const { Title } = Typography;

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
  padding: "10px 20px",
};

function SekaniHero({ heroImg, heroTitle, heroText }) {
  const { isMobile } = useUser();

  const bannerHeight = isMobile ? 'auto' : 700;

  return (
    <div style={{ position: "relative", height: bannerHeight, width: "100%" }}>
      <Carousel autoplay autoplaySpeed={3500} dots={false}>
        {(Array.isArray(heroImg) ? heroImg : [heroImg]).map((img, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: bannerHeight,
              overflow: "hidden",
            }}
          >
            <img
              src={img}
              alt="hero"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
              }}
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>

      {/* Overlay */}
      <div style={heroStyle}>
        <SplitText
          text={
            <Title
              level={isMobile ? 5 : 3}
              style={{
                color: "#fff",
                fontFamily: "Alegreya Sans",
                textAlign: "center",
                fontSize: isMobile ? 24 : 38,
                margin: 0,
                fontWeight: 400,
                letterSpacing: 2,
              }}
            >
              {heroTitle}
            </Title>
          }
          delay={50}
          duration={0.1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />

        <Title
          level={2}
          style={{
            marginTop: 10,
            color: "#fff",
            fontFamily: "Alegreya Sans",
            fontWeight: 300,
            textAlign: "center",
            width: isMobile ? "105%" : "65%",
            fontSize: isMobile ? 20 : 36,
          }}
        >
          {heroText}
        </Title>
      </div>
    </div>
  );
}

export default SekaniHero;
