import { Carousel, Col, Image, Modal, Row, Typography, Tag, Divider, Space } from "antd";
import React from "react";
import {
  HomeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function PropertyModal({ openModal, setOpenModal, loading, content }) {
  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={"90%"}
      bodyStyle={{ padding: 24 }}
      style={{ top: 20 }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column - Images */}
        <Col xs={24} md={12}>
          <Carousel autoplay autoplaySpeed={3000}>
            {Array.isArray(content?.img) && content?.img.length > 0 ? (
              content.img.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={content?.listingId}
                  preview={false}
                  style={{
                    width: "100%",
                    height: 350,
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
              ))
            ) : (
              <Image
                src={content?.img || "https://via.placeholder.com/500x350"}
                alt={content?.listingId}
                preview={false}
                style={{
                  width: "100%",
                  height: 350,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            )}
          </Carousel>
        </Col>

        {/* Right Column - Details */}
        <Col xs={24} md={12}>
          <Title level={4} style={{ marginBottom: 4 }}>
            {content?.propertyType} – {content?.bedrooms} BR / {content?.bathrooms} BA
          </Title>
          <Text type="secondary">
            <EnvironmentOutlined /> {content?.address}, {content?.city},{" "}
            {content?.state}
          </Text>

          <Divider />

          <Space direction="vertical" size="small">
            <Text strong>
              <DollarOutlined /> Price:{" "}
              <span style={{ color: "#1890ff" }}>
                KES {content?.price?.toLocaleString()}
              </span>
            </Text>
            <Text>
              <HomeOutlined /> Size: {content?.squareFeet} sq. ft
            </Text>
            <Text>
              <CalendarOutlined /> Built: {content?.yearBuilt}
            </Text>
            <Text>
              <CheckCircleOutlined /> Status:{" "}
              <Tag
                color={
                  content?.status === "For Sale"
                    ? "green"
                    : content?.status === "Pending"
                    ? "orange"
                    : "blue"
                }
              >
                {content?.status}
              </Tag>
            </Text>
          </Space>

          <Divider />

          <Paragraph>{content?.description}</Paragraph>

          <Divider orientation="left">Amenities</Divider>
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
