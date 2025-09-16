import React, { useContext } from "react";
import { lightTheme, UserContext } from "../App";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Image,
  Row,
  Typography,
} from "antd";
import "../assets/css/home.css";
import { useNavigate } from "react-router-dom";
import Motion from "../components/Motion";
import SplitText from "../components/SplitText";
import bgImg from "../assets/images/bg1.jpeg";
import bgImg2 from "../assets/images/bg2.jpeg";
import bgImg3 from "../assets/images/bg3.jpeg";
import bgImg4 from "../assets/images/bg4.jpeg";
import bgImg5 from "../assets/images/bg5.jpeg";
import bgImg6 from "../assets/images/bg6.jpeg";
import bgImg7 from "../assets/images/bg7.jpeg";

const { Title, Text, Paragraph } = Typography;

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

// const bgImg =
//   "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg";
// const bgImg2 =
//   "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg";
// const bgImg3 =
//   "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg";
// const bgImg4 =
//   "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg";
// const bgImg5 =
//   "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg";
// const bgImg6 =
//   "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg";
// const bgImg7 =
//   "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg";

const bgCarousel = [bgImg, bgImg2, bgImg3, bgImg4, bgImg5, bgImg6, bgImg7];

const gridImg1 =
  "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900";
const gridImg2 =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900";
const gridImg3 =
  "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900";

const homeImg1 =
  "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=900";
const homeImg2 =
  "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=900";
const homeImg3 =
  "https://plus.unsplash.com/premium_photo-1675537856917-d662fd1ddc3a?w=900";
const homeImg4 =
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900";
const homeImg5 =
  "https://plus.unsplash.com/premium_photo-1676823570630-be7b7e1ce1bb?w=900";
const homeImg6 =
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=900";

const bannerImg =
  "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900";

const avatar =
  "https://plus.unsplash.com/premium_photo-1726768854379-105f9aeef18d?w=900";

const gridData = [
  { key: 1, img: gridImg1, text: "Featured Listings" },
  { key: 2, img: gridImg2, text: "AirBnbs" },
  { key: 3, img: gridImg3, text: "More" },
];

const cardData = [
  {
    key: 1,
    img: [homeImg1, homeImg4],
    address: "780 Kiambu Rd, Kiambu",
    bedrooms: 3,
    price: 300000,
  },
  {
    key: 2,
    img: [homeImg2, homeImg5],
    address: "210 Muthaiga, Kiambu",
    bedrooms: 2,
    price: 100000,
  },
  {
    key: 3,
    img: [homeImg3, homeImg6],
    address: "491 Lavington, Nairobi",
    bedrooms: 2,
    price: 200000,
  },
];
function Home() {
  const navigate = useNavigate();
  const { isMobile } = useContext(UserContext);

  return (
    <Motion>
      <div style={{ background: "whitesmoke" }}>
        {/* banner */}
        <div style={{ position: "relative" }}>
          <Carousel autoplay autoplaySpeed={3500} dots={false}>
            {bgCarousel.map((img) => (
              <Image
                src={img}
                alt="bgImg"
                width="100%"
                height={isMobile ? 900 : 700}
                preview={false}
                style={{
                  objectFit: isMobile ? "contain" : "cover",
                  maxWidth: "100%",
                }}
              />
            ))}
          </Carousel>
          <div style={{ ...heroStyle }}>
            <SplitText
              text={
                <Title
                  level={3}
                  style={{ ...titleStyle, fontSize: isMobile ? 34 : 38 }}
                >
                  YOUR HOME MADE SIMPLE
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

            <Title
              level={2}
              style={{
                ...subTitleStyle,
                width: isMobile ? "100%" : "65%",
                fontSize: isMobile ? 30 : 36,
              }}
            >
              Experience seamless real estate with Sekani. Discover dream homes,
              lucrative investments, and unforgettable stays.
            </Title>
            <SplitText
              text={
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
              }
              delay={10}
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
        {/* home body */}
        <div>
          <div style={{ textAlign: "center" }}>
            <SplitText
              text={
                <Title
                  level={3}
                  style={{ ...titleStyle, color: "#333", marginBottom: 0 }}
                >
                  HOW CAN WE HELP?
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
            <Title
              level={5}
              style={{
                ...subTitleStyle,
                color: "#333",
                marginTop: 0,
                marginBottom: 10,
                width: "100%",
              }}
            >
              Explore Our Solutions
            </Title>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 10,
              justifyContent: "center",
              padding: "0px 10px",
              margin: "0px 10px",
              overflow: "hidden",
            }}
          >
            {gridData.map((grid, index) => (
              <div
                style={{
                  flex: 1, // all equal initially
                  transition: "flex 0.5s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}
                className="image-wrapper"
                key={index}
                onClick={() => navigate("/properties")}
              >
                <img
                  src={grid.img}
                  alt="img"
                  style={{
                    maxWidth: "100%",
                    height: isMobile ? "auto" : "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                />
                <div style={{ position: "absolute", bottom: 0 }}>
                  <Text
                    style={{
                      fontFamily: "Alegray Sans",
                      color: "#fff",
                      letterSpacing: 3,
                      fontSize: 36,
                      fontWeight: 800,
                    }}
                  >
                    {grid.text}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Listings */}
        <div style={{ margin: "0 20px" }}>
          <div style={{ textAlign: "center" }}>
            <SplitText
              text={
                <Title
                  level={3}
                  style={{ ...titleStyle, color: "#333", marginBottom: 0 }}
                >
                  HANDPICKED JUST FOR YOU
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
            <Title
              level={5}
              style={{
                ...subTitleStyle,
                color: "#333",
                marginTop: 0,
                marginBottom: 10,
                width: "100%",
              }}
            >
              Featured Listings
            </Title>
          </div>
          <Row gutter={[16, 16]}>
            {cardData.map((c) => (
              <Col key={c.key} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    minHeight: 220,
                    borderRadius: 12,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
                    background: "#eae4ac81",
                    border: `1px solid #ffffff7e`,
                  }}
                  cover={
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: 500,
                        overflow: "hidden",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        padding: 1,
                      }}
                    >
                      <Carousel autoplay autoplaySpeed={3500} fade dots={false}>
                        {c.img.length > 1 ? (
                          c.img.map((img) => (
                            <Image
                              src={img}
                              alt={c.key}
                              preview={false}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: 12,
                              }}
                            />
                          ))
                        ) : (
                          <Image
                            src={c.img}
                            alt={c.key}
                            preview={false}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: 12,
                            }}
                          />
                        )}
                      </Carousel>

                      {/* <Image
                        src={c.img}
                        alt={c.key}
                        preview={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 12,
                        }}
                      /> */}
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <Title
                        level={isMobile ? 4 : 3}
                        style={{
                          marginTop: 1,
                          marginBottom: 2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontFamily: "Alegreya Sans",
                          color: lightTheme.color,
                        }}
                      >
                        {c.address}
                      </Title>
                    }
                    description={
                      <Text
                        type="secondary"
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        {c.bedrooms} Bedrooms
                      </Text>
                    }
                  />
                  <div>
                    <Title
                      level={isMobile ? 4 : 3}
                      style={{ fontFamily: "Raleway" }}
                    >
                      KES. {c.price.toLocaleString()}
                    </Title>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <div
            style={{
              alignContent: "center",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <Button
              style={{
                borderRadius: 18,
                background: "#555344ff",
                height: 40,
                padding: "0 18px",
                fontFamily: "Raleway",
                fontWeight: 500,
                letterSpacing: 1,
              }}
              type="primary"
              onClick={() => navigate("/properties")}
            >
              View All
            </Button>
          </div>
        </div>
        {/* testimonials */}
        <div style={{ textAlign: "center", marginTop: 15 }}>
          <SplitText
            text={
              <Title
                level={3}
                style={{ ...titleStyle, color: "#333", marginBottom: 0 }}
              >
                WHY CHOOSE US?
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
          <Title
            level={5}
            style={{
              ...subTitleStyle,
              color: "#333",
              marginTop: 0,
              marginBottom: 10,
              width: "100%",
            }}
          >
            More Than A Real Estate Agent
          </Title>
        </div>

        <div style={{ position: "relative" }}>
          <Image
            src={bannerImg}
            alt="bgImg"
            width="100%"
            height={400}
            preview={false}
            style={{ objectFit: "cover" }}
          />{" "}
          <div style={heroStyle}>
            <Paragraph
              style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : 900,
                fontFamily: "Alegreya Sans",
                color: "#fff",
                fontSize: isMobile ? 22 : 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              "Sekani took the time to understand exactly what we wanted and
              found us a home that exceeded our expectations. Their market
              knowledge and negotiation skills helped us secure the property at
              a great price, even in this competitive market."
            </Paragraph>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: 10,
              }}
            >
              <Avatar size={70} src={avatar} />
              <div>
                <Text
                  style={{
                    fontFamily: "Alegreya Sans",
                    color: "#fff",
                    fontSize: isMobile ? 18 : 22,
                  }}
                >
                  John Doe, <span>Buyer</span>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
}

export default Home;
