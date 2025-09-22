import React, { useContext, useState } from "react";
import Motion from "../components/Motion";
import {
  Typography,
  Image,
  Input,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Badge,
  Tag,
  Divider,
} from "antd";
import { lightTheme, UserContext } from "../App";
import { RealEstateData } from "../assets/data/mockData.js";
import PropertyModal from "../components/PropertyModal.js";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/images/propertyBg.jpeg";
import FilterComponent from "../components/FilterComponent.js";

const { Title, Text } = Typography;
const { Search } = Input;

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.45)",
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

const tagStyle = {
  borderRadius: 18,
  padding: "4px 12px",
  fontFamily: "Raleway",
  fontWeight: 600,
  fontSize: 16,
  margin: 5,
  cursor: "pointer",
};

// const bgImg =
//   "https://images.pexels.com/photos/2134224/pexels-photo-2134224.jpeg";

const tagsData = ["For Sale", "Airbnb", "For Rent", "Commercial", "Land"];

function Properties() {
  const navigate = useNavigate();
  const { isMobile } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [properties, setProperties] = useState(RealEstateData);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheck = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    filterProperty(nextSelectedTags);
  };

  const filterProperty = (terms) => {
    if (!terms.length) {
      setProperties(RealEstateData);
      return;
    }
    const filteredData = RealEstateData.filter((data) =>
      terms.includes(data.listingType)
    );
    setProperties(filteredData);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchValue(value);
    if (!value) {
      setProperties(RealEstateData);
      setSearchValue(null);
      return;
    }

    const filteredData = RealEstateData.filter((item) =>
      Object.values(item).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(value)
      )
    );
    setProperties(filteredData);
  };

  const viewProperty = (property) => {
    setLoading(true);
    setOpenModal(true);
    setContent(property);
    setTimeout(() => setLoading(false), 100);
  };

  return (
    <Motion>
      <div style={{ background: "whitesmoke" }}>
        {/* banner */}
        <div style={{ position: "relative" }}>
          <Image
            src={bgImg}
            alt="bgImg"
            width="100%"
            height={isMobile ? 450 : 500}
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
                placeholder="Search by location, listing type..."
                size="large"
                loading={loading}
                enterButton
                //onSearch={handleSearch}
                onChange={handleSearch}
                style={{ width: isMobile ? 350 : 600, height: 50 }}
              />
            </div>
          </div>
        </div>
        {/* body */}
        <div>
          {/* tags */}
          <div style={{ margin: 10, padding: 15 }}>
            {tagsData.map((tag) => {
              const isChecked = selectedTags?.includes(tag);
              return (
                <Tag.CheckableTag
                  key={tag}
                  checked={isChecked}
                  onChange={(checked) => handleCheck(tag, checked)}
                  style={{
                    ...tagStyle,
                    color: isChecked ? "#fff" : "#333",
                    backgroundColor: isChecked ? "#8d8009ff" : "rgba(0,0,0,0)",
                    border: isChecked
                      ? "1px solid rgba(0,0,0,0)"
                      : "1px solid #333",
                  }}
                >
                  {tag}
                  {isChecked && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheck(tag, false);
                      }}
                      style={{
                        marginLeft: 6,
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <CloseOutlined />
                    </span>
                  )}
                </Tag.CheckableTag>
              );
            })}
          </div>

          <div style={{ margin: "8px 20px" }}>
            {searchValue && (
              <div style={{ marginBottom: 20, marginTop: 0 }}>
                <Title style={{ fontFamily: "Alegreya Sans" }}>
                  Results for "{searchValue}"
                </Title>
              </div>
            )}

            {properties.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontFamily: "Raleway",
                  fontWeight: 500,
                }}
              >
                Sorry, we did not find the term you are looking for. Reach out
                to us{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/contact")}
                >
                  here
                </span>{" "}
                for any inquiries
              </p>
            ) : (
              <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} md={6}>
                  <FilterComponent />
                </Col>
                <Col xs={24} sm={12} md={18}>
                  <Row gutter={[32, 32]}>
                    {properties?.map((c) => (
                      <Col key={c.key} xs={24} sm={12} md={8}>
                        <Card
                          hoverable
                          style={{
                            minHeight: 200,
                            borderRadius: 12,
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.17)",
                            background: "#eae4ac81",
                            border: `1px solid #ffffff7e00`,
                            
                          }}
                          cover={
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                height: 350,
                                overflow: "hidden",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                padding: 1,
                              }}
                            >
                              <Badge.Ribbon
                                text={`${c.listingType}`}
                                style={{
                                  display: "block",
                                  right: "10px",
                                  background: "#8d8009ff",
                                  padding: "2px 10px",
                                  fontFamily: "Raleway",
                                }}
                              >
                                <Carousel
                                  autoplay
                                  autoplaySpeed={3800}
                                  //fade
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
                              </Badge.Ribbon>
                            </div>
                          }
                        >
                          <Card.Meta
                            title={
                              <Title
                                level={isMobile ? 5 : 4}
                                style={{
                                  marginTop: 1,
                                  marginBottom: 0,
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
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: 0,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                    gap: 10,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Roboto",
                                      fontWeight: 500,
                                      fontSize: 14,
                                    }}
                                  >
                                    {c.propertyType}
                                  </Text>
                                  <Divider
                                    type="vertical"
                                    style={{
                                      fontWeight: "bold",
                                      margin: 0,
                                      borderColor: "#aaa",
                                    }}
                                  />
                                  {/* <p style={{ fontWeight: "bold", margin: 0 }}>|</p> */}
                                  <Tag
                                    style={{
                                      background:
                                        c?.status === "For Sale"
                                          ? "green"
                                          : c?.status === "Pending" ||
                                            c?.status === "Under Offer"
                                          ? "orange"
                                          : "green",
                                      borderRadius: 10,
                                      border: "0px solid rgba(0,0,0,0)",
                                      padding: "2px 10px",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#fff",
                                        fontFamily: "Roboto",
                                        fontSize: 12,
                                      }}
                                    >
                                      {c.status}
                                    </Text>
                                  </Tag>
                                </div>
                                <Text
                                  type="secondary"
                                  style={{
                                    fontFamily: "Roboto",
                                    fontWeight: 500,
                                    fontSize: 14,
                                  }}
                                >
                                  {c.bedrooms}{" "}
                                  {c.bedrooms > 1 ? "Bedrooms" : "Bedroom"},{" "}
                                  {c.bathrooms}{" "}
                                  {c.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                                </Text>
                              </div>
                            }
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 0,
                              gap: 6,
                            }}
                          >
                            <Title
                              level={isMobile ? 5 : 4}
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
                                background: "rgba(0,0,0,0)",
                                border: "1px solid #333",
                                color: "#333",
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
                </Col>
              </Row>
            )}
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
