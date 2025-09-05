import {
  Carousel,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Tag,
  Divider,
  Space,
} from "antd";
import React, { useContext } from "react";
import {
  HomeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";

const { Title, Text, Paragraph } = Typography;

function PropertyModal({ openModal, setOpenModal, loading, content }) {
  const { isMobile } = useContext(UserContext);
  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={"90%"}
      bodyStyle={{ padding: 24, backgroundColor: "whitesmoke" }}
      style={{ top: 10 }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column - Images */}
        <Col
          xs={24}
          md={12}
          style={{
            alignItems: "center",
          }}
        >
          <Carousel
            autoplay={{ dotDuration: true }}
            autoplaySpeed={3000}
            arrows
          >
            {Array.isArray(content?.img) && content?.img.length > 0 ? (
              content.img.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={content?.listingId}
                  //preview={false}
                  height={500}
                  width={500}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 18,
                  }}
                />
              ))
            ) : (
              <Image
                src={content?.img}
                alt={content?.listingId}
                preview={false}
                height={500}
                width={500}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 18,
                }}
              />
            )}
          </Carousel>
        </Col>

        {/* Right Column - Details */}
        <Col xs={24} md={12}>
          <Title
            level={isMobile ? 4 : 3}
            style={{ marginBottom: 2, fontFamily: "Alegreya Sans" }}
          >
            {content?.propertyType} – {content?.bedrooms} BR /{" "}
            {content?.bathrooms} BA
          </Title>
          <Text type="secondary" style={{ fontFamily: "Raleway" }}>
            <EnvironmentOutlined /> {content?.address}, {content?.city},{" "}
            {content?.state}
          </Text>

          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Text
              style={{
                fontFamily: "Raleway",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
              About
            </Text>
          </Divider>
          <Paragraph style={{ fontFamily: "Raleway" }}>
            {content?.description}
          </Paragraph>

          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 5,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text strong>
                  <DollarOutlined style={{ fontSize: 22 }} /> Price:{" "}
                  <span style={{ color: "#1890ff" }}>
                    KES {content?.price?.toLocaleString()}
                  </span>
                </Text>
                <Text>
                  <HomeOutlined style={{ fontSize: 22 }} /> Size:{" "}
                  {content?.squareFeet} sq. ft
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text>
                  <CalendarOutlined style={{ fontSize: 22 }} /> Built:{" "}
                  {content?.yearBuilt}
                </Text>
                <Text>
                  <CheckCircleOutlined style={{ fontSize: 22 }} /> Status:{" "}
                  <Tag
                    style={{
                      color: "#fff",
                      background:
                        content?.status === "For Sale"
                          ? "green"
                          : content?.status === "Pending"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {content?.status}
                  </Tag>
                </Text>
              </div>
            </div>
          </Space>

          <Divider orientation="left" style={{ borderColor: "#333" }}>
            Amenities
          </Divider>
          <Space wrap>
            {content?.amenities?.map((item, index) => (
              <Tag color="geekblue" key={index}>
                {item}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>
    </Modal>
  );
}

export default PropertyModal;
