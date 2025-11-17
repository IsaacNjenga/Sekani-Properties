import { Image, Typography } from "antd";
import Motion from "../components/Motion";
import SplitText from "../components/SplitText";
import { useUser } from "../contexts/UserContext";

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
  const { isMobile } = useUser()
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
            <SplitText
              text={
                <Title
                  level={3}
                  style={{ ...titleStyle, fontSize: isMobile ? 34 : 38 }}
                >
                  ABOUT US
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
              At <b>Sekani Real Estate</b>, we believe that finding your dream
              home should be more than just a transaction — it should be a
              journey built on trust, expertise, and genuine care. Our team is
              dedicated to helping you navigate the world of real estate with
              confidence, whether you’re buying your first home, expanding your
              investment portfolio, or searching for a perfect commercial space.
            </Paragraph>
            <Paragraph style={paragraphStyle}>
              We take pride in combining local market knowledge with a modern
              approach to property management and sales. Every property we list
              is carefully curated to match your lifestyle, preferences, and
              future goals. From urban apartments and family homes to luxury
              villas and land investments, Sekani Real Estate is your trusted
              partner in making smart real estate decisions.
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
              Our goal is simple — to make home ownership and investment
              seamless. Through innovation, transparency, and personalized
              service, we turn the complex process of buying, selling, or
              renting property into a smooth, enjoyable experience. Whether
              you’re a homeowner, a developer, or an investor, we’re here to
              help you every step of the way.
            </Paragraph>
            <Paragraph style={paragraphStyle}>
              With a growing portfolio of satisfied clients, Sekani Real Estate
              continues to redefine what it means to work with a property agency
              — where your vision becomes our mission, and every house becomes a
              home.
            </Paragraph>
          </div>
        </div>
      </div>
    </Motion>
  );
}

export default About;
