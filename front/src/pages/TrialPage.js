import { Typography } from "antd";
import SekaniVid from "../assets/videos/sekani.mp4";
import SplitText from "../components/SplitText";
import { useUser } from "../contexts/UserContext";

const { Title, Paragraph } = Typography;

const heroContainer = {
  position: "relative",
  width: "100%",
  height: "100vh", 
  overflow: "hidden",
};

const videoStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover", 
  zIndex: 1,
};

const overlayStyle = {
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
  zIndex: 2,
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 600,
  letterSpacing: 2,
};

const subTitleStyle = {
  marginTop: 16,
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 400,
  fontSize: 20,
  maxWidth: 600,
};

function TrialPage() {
  const { isMobile } = useUser();

  return (
    <div>
      <div style={heroContainer}>
        {/* Fullscreen Video */}
        <video style={videoStyle} muted autoPlay loop playsInline>
          <source src={SekaniVid} type="video/mp4" />
        </video>

        {/* Overlay Content */}
        <div style={overlayStyle}>
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
          />

          <Paragraph style={subTitleStyle}>
            We’re here to help you find your dream property or answer any
            questions you may have. Reach out anytime.
          </Paragraph>
        </div>
      </div>
      <div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
        if he can hold the world he can hold this moment not a field or flower
        escapes his notice. oooh even the sparrow knows he holds tomorrow
      </div>
    </div>
  );
}

export default TrialPage;
