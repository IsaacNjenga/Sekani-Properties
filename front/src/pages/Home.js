//import { lightTheme } from "../App";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Image,
  Rate,
  Row,
  Space,
  Tag,
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
import { useUser } from "../contexts/UserContext";
import {
  ArrowRightOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  HeartOutlined,
  HomeOutlined,
} from "@ant-design/icons";

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
  padding: "10px 20px",
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Bodoni Moda",
  textAlign: "center",
  fontWeight: "600",
  letterSpacing: 1.2,
  marginBottom: 0,
};

const subTitleStyle = {
  marginTop: 5,
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 300,
  textAlign: "center",
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

const bgCarousel = [
  bgImg,
  bgImg2,
  bgImg3,
  bgImg4,
  bgImg5,
  bgImg6,
  bgImg7,
  "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=900",
  "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900",
  "https://images.unsplash.com/photo-1727192807128-0cee790dcc83?w=900",
];

const gridData = [
  {
    key: 1,
    img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900",
    text: "Featured Listings",
  },
  {
    key: 2,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900",
    text: "AirBnbs",
  },
  {
    key: 3,
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900",
    text: "More",
  },
];

const cardData = [
  {
    key: 1,
    img: [
      "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=900",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900",
    ],
    address: "780 Kiambu Rd, Kiambu",
    bedrooms: 3,
    bathrooms: 2,
    price: 300000,
  },
  {
    key: 2,
    img: [
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=",
      "https://plus.unsplash.com/premium_photo-1676823570630-be7b7e1ce1bb?w=900",
    ],
    address: "210 Muthaiga, Kiambu",
    bedrooms: 2,
    bathrooms: 2,
    price: 100000,
  },
  {
    key: 3,
    img: [
      "https://plus.unsplash.com/premium_photo-1675537856917-d662fd1ddc3a?w=900",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=900",
    ],
    address: "491 Lavington, Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    price: 200000,
  },
];
function Home() {
  const navigate = useNavigate();
  const { isMobile } = useUser();

  return (
    <Motion>
      <div style={{ background: "whitesmoke" }}>
        {/* banner */}
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Carousel autoplay autoplaySpeed={3800} dots={false} fade>
            {bgCarousel.map((img) => (
              <Image
                src={img}
                alt="bgImg"
                width="100%"
                height={isMobile ? 350 : 700}
                preview={false}
                loading="lazy"
                style={{
                  objectFit: isMobile ? "contain" : "cover",
                  maxWidth: "100%",
                }}
              />
            ))}
          </Carousel>
          <div className="banner-hero-style">
            <SplitText
              text={
                <Title
                  level={isMobile ? 5 : 2}
                  style={{
                    ...titleStyle,
                    fontSize: isMobile ? 20 : 38,
                    margin: 0,
                  }}
                >
                  YOUR HOME MADE SIMPLE
                </Title>
              }
              delay={100}
              duration={0.2}
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
                width: isMobile ? "105%" : "65%",
                fontSize: isMobile ? 20 : 36,
              }}
            >
              Experience seamless real estate with Sekani. Discover dream homes,
              lucrative investments, and unforgettable stays.
            </Title>
            <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
              <Button
                type="primary"
                style={ctaBtn1Style}
                onClick={() => navigate("/properties")}
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
                onClick={() => navigate("/contact")}
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
        <div style={{ margin: "30px 0" }}>
          <div style={{ textAlign: "center" }}>
            <SplitText
              text={
                <Title
                  level={2}
                  style={{
                    ...titleStyle,
                    color: "#333",
                    marginBottom: 0,
                    fontWeight: 500,
                    fontSize: isMobile ? 20 : 38,
                    margin: 0,
                  }}
                >
                  HOW CAN WE HELP?
                </Title>
              }
              delay={100}
              duration={0.3}
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
                      fontFamily: "Bodoni Moda",
                      color: "#fff",
                      letterSpacing: 3,
                      fontSize: 36,
                      fontWeight: 600,
                    }}
                  >
                    {grid.text}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Listings */}
        <div style={{ margin: "30px 20px" }}>
          <div style={{ textAlign: "center" }}>
            <SplitText
              text={
                <Title
                  level={2}
                  style={{
                    ...titleStyle,
                    color: "#333",
                    marginBottom: 0,
                    fontWeight: 500,
                    fontSize: isMobile ? 20 : 38,
                    margin: 0,
                  }}
                >
                  HANDPICKED JUST FOR YOU
                </Title>
              }
              delay={100}
              duration={0.2}
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
                    minHeight: 260,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    background: "#fff",
                    border: "none",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  bodyStyle={{
                    padding: "25px",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.12)";
                  }}
                  cover={
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: isMobile ? 280 : 320,
                        overflow: "hidden",
                      }}
                    >
                      {/* Decorative Pattern Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `
              radial-gradient(circle at 20% 80%, rgba(189, 184, 144, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)
            `,
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />

                      <Carousel autoplay autoplaySpeed={3500} fade dots={false}>
                        {(Array.isArray(c.img) ? c.img : [c.img]).map(
                          (img, index) => (
                            <div
                              key={index}
                              style={{
                                position: "relative",
                                height: isMobile ? 280 : 320,
                              }}
                            >
                              <Image
                                src={img}
                                alt={`${c.address} - Image ${index + 1}`}
                                preview={{ mask: "Click to view" }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              {/* Gradient Overlay */}
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "40%",
                                  background:
                                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                                }}
                              />
                            </div>
                          )
                        )}
                      </Carousel>

                      {/* Status Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          zIndex: 2,
                        }}
                      >
                        <Tag
                          style={{
                            background:
                              c.status === "Available"
                                ? "linear-gradient(135deg, #52c41a, #73d13d)"
                                : "linear-gradient(135deg, #faad14, #ffc53d)",
                            color: "white",
                            border: "none",
                            borderRadius: 20,
                            padding: "4px 12px",
                            fontSize: 16,
                            fontWeight: 200,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            fontFamily: "Raleway",
                          }}
                        >
                          {c.status || "Available"}
                        </Tag>
                      </div>

                      {/* Property Type Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          zIndex: 2,
                        }}
                      >
                        <Tag
                          icon={
                            <HomeOutlined
                              style={{
                                fontSize: 16,
                                fontWeight: 200,
                              }}
                            />
                          }
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(10px)",
                            color: "#1890ff",
                            border: "none",
                            borderRadius: 20,
                            padding: "4px 12px",
                            fontSize: 16,
                            fontWeight: 200,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            fontFamily: "Raleway",
                          }}
                        >
                          {c.propertyType || "Airbnb"}
                        </Tag>
                      </div>

                      {/* Views/Favorite Icons */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          zIndex: 2,
                          display: "flex",
                          gap: 8,
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 20,
                            padding: "6px 12px",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        >
                          <HeartOutlined
                            style={{ color: "#ff4d4f", fontSize: 14 }}
                          />
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#595959",
                            }}
                          >
                            {c.likes || 20}
                          </Text>
                        </div>
                        <div
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 20,
                            padding: "6px 12px",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        >
                          <EyeOutlined
                            style={{ color: "#8c8c8c", fontSize: 14 }}
                          />
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#595959",
                            }}
                          >
                            {c.views || 20}
                          </Text>
                        </div>
                      </div>
                    </div>
                  }
                >
                  {/* Content */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Location */}
                    <div style={{ marginBottom: 0 }}>
                      <Space size={4}>
                        <EnvironmentOutlined
                          style={{ color: "#bdb890", fontSize: 16 }}
                        />
                        <Text
                          type="secondary"
                          style={{
                            color: "#8c8c8c",
                            fontSize: 16,
                            fontFamily: "Bodoni Moda",
                          }}
                        >
                          {c.city || "Nairobi"}, {c.county || "Nairobi County"}
                        </Text>
                      </Space>
                    </div>

                    {/* Title */}
                    <Title
                      level={isMobile ? 4 : 3}
                      style={{
                        marginTop: 0,
                        marginBottom: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontFamily: "Raleway",
                        color: "#1e293b",
                        fontSize: isMobile ? 18 : 22,
                        fontWeight: 400,
                      }}
                    >
                      {c.address}
                    </Title>

                    {/* Property Details */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 16,
                        paddingBottom: 16,
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flexDirection: "row",
                        }}
                      >
                        <div>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "#1e293b",
                              lineHeight: 1.2,
                              fontFamily: "Raleway",
                            }}
                          >
                            {c.bedrooms}
                          </Text>{" "}
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#8c8c8c",
                              fontFamily: "Raleway",
                            }}
                          >
                            Beds
                          </Text>
                        </div>
                      </div>

                      {c.bathrooms && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexDirection: "row",
                          }}
                        >
                          <div>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: "#1e293b",
                                lineHeight: 1.2,
                                fontFamily: "Raleway",
                              }}
                            >
                              {c.bathrooms}
                            </Text>{" "}
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#8c8c8c",
                                fontFamily: "Raleway",
                              }}
                            >
                              Baths
                            </Text>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Title
                          level={isMobile ? 4 : 3}
                          style={{
                            fontFamily: "Abril Fatface",
                            margin: 0,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            fontSize: isMobile ? 20 : 24,
                            color: "#b0aa94",
                            letterSpacing: 2,
                          }}
                        >
                          KES {c.price.toLocaleString()}
                        </Title>
                      </div>

                      {/* View Details Button */}
                      <div
                        style={{
                          background:
                            "linear-gradient(135deg, #b0aa94, #b0aa94)",
                          borderRadius: 10,
                          padding: "10px 20px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow =
                            "0 6px 16px rgba(102, 126, 234, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(102, 126, 234, 0.3)";
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: 300,
                            fontSize: 16,
                            fontFamily: "Raleway",
                          }}
                        >
                          View Details
                        </Text>
                      </div>
                    </div>
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
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => navigate("/properties")}
            >
              View More
            </Button>
          </div>
        </div>

        {/* testimonials */}
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <SplitText
            text={
              <Title
                level={2}
                style={{
                  ...titleStyle,
                  color: "#333",
                  marginBottom: 0,
                  fontWeight: 500,
                  fontSize: isMobile ? 20 : 38,
                  margin: 0,
                }}
              >
                WHY CHOOSE US?
              </Title>
            }
            delay={100}
            duration={0.2}
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
            src={
              "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900"
            }
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
                fontFamily: "Bodoni Moda",
                color: "#fff",
                fontSize: isMobile ? 22 : 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              "Sekani took the time to understand exactly what I wanted and
              found me a home that exceeded my expectations. Their market
              knowledge and negotiation skills really helped me secure the
              property at a great price, even in this competitive market."
            </Paragraph>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: 10,
              }}
            >
              <Avatar
                size={70}
                src={
                  "https://plus.unsplash.com/premium_photo-1726768854379-105f9aeef18d?w=900"
                }
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <Text
                    style={{
                      fontFamily: "Raleway",
                      color: "#fff",
                      fontSize: isMobile ? 18 : 22,
                    }}
                  >
                    John Doe, <span>Buyer</span>
                  </Text>
                </div>
                <div>
                  <Rate defaultValue={5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
}

export default Home;
