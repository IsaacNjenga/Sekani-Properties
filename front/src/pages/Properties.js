import React, { useContext, useState } from "react";
import Motion from "../components/Motion";
import {
  Typography,
  Image,
  Input,
  Tag,
  Row,
  Col,
  Card,
  Carousel,
  Button,
} from "antd";
import { lightTheme, UserContext } from "../App";
import { RealEstateData } from "../assets/data/mockData.js";
import PropertyModal from "../components/PropertyModal.js";

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

const tagStyle = {
  borderRadius: 18,
  padding: "4px 12px",
  backgroundColor: "rgba(0,0,0,0)",
  border: "1px solid #333",
  fontFamily: "Raleway",
  fontWeight: 600,
  fontSize: 16,
  margin: 5,
};

const bgImg =
  "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=900";

function Properties() {
  const { isMobile } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewProperty = (property) => {
    setLoading(true);
    setOpenModal(true);
    setContent(property);
    setTimeout(() => setLoading(false), 100);
  };
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
        <div>
          <div style={{ margin: 10, padding: 15 }}>
            <Tag style={tagStyle}>For Sale</Tag>
            <Tag style={tagStyle}>For Rent</Tag>
            <Tag style={tagStyle}>Airbnb</Tag>
            <Tag style={tagStyle}>Commercial</Tag>
            <Tag style={tagStyle}>Land</Tag>
          </div>

          <div style={{ margin: "8px 20px" }}>
            <Row gutter={[16, 16]}>
              {RealEstateData?.map((c) => (
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
                        <Carousel
                          autoplay
                          autoplaySpeed={3800}
                          fade
                          dots={false}
                        >
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
                          {c.bedrooms} {c.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                        </Text>
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 0,
                      }}
                    >
                      <Title
                        level={isMobile ? 4 : 3}
                        style={{ fontFamily: "Raleway" }}
                      >
                        KES. {c.price.toLocaleString()}
                      </Title>
                      <Button
                        type="primary"
                        style={{
                          borderRadius: 18,
                          padding: "4px 16px",
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                        }}
                        onClick={() => viewProperty(c)}
                      >
                        View
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
      <PropertyModal
        content={content}
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={loading}
      />
    </Motion>
  );
}

export default Properties;
