import {
  CaretRightOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Image,
  Rate,
  Tag,
  Typography,
} from "antd";
import { myReviewsData } from "../assets/data/mockData";

const { Title, Text, Paragraph } = Typography;

const ReviewUI = ({ review, item }) => {
  return (
    <div
    // style={{ position: "sticky", top: 20 }}
    >
      {/* review */}
      <Text>{review.review}</Text>
      <Rate allowHalf disabled value={review.rating} />

      {/* Property Card */}
      <Card
        style={{
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "none",
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Property Images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 8,
            padding: 16,
            background: "#f8fafc",
          }}
        >
          {(Array.isArray(item.img) ? item.img : [item?.img]).map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Property ${i + 1}`}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          ))}
        </div>

        <div style={{ padding: 24 }}>
          {/* Status Tag */}
          <Tag
            icon={<HomeOutlined />}
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 14,
              fontFamily: "Raleway",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {item.status}
          </Tag>

          {/* Property Title */}
          <Title
            level={4}
            style={{
              fontFamily: "Raleway",
              marginBottom: 8,
              color: "#1e293b",
            }}
          >
            {item.propertyType}
          </Title>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <EnvironmentOutlined style={{ color: "#bdb890", fontSize: 16 }} />
            <Text
              style={{
                fontFamily: "Raleway",
                color: "#64748b",
              }}
            >
              {item.address}, {item.city}
            </Text>
          </div>

          {/* Property Details */}
          <div
            style={{
              display: "flex",
              gap: 16,
              padding: "16px 0",
              borderTop: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0",
              marginBottom: 16,
            }}
          >
            <div>
              <Text
                strong
                style={{
                  fontFamily: "Raleway",
                  fontSize: 18,
                  color: "#1e293b",
                  display: "block",
                }}
              >
                {item.bedrooms}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway",
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                Bedrooms
              </Text>
            </div>
            <Divider type="vertical" style={{ height: "auto", margin: 0 }} />
            <div>
              <Text
                strong
                style={{
                  fontFamily: "Raleway",
                  fontSize: 18,
                  color: "#1e293b",
                  display: "block",
                }}
              >
                {item.bathrooms}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway",
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                Bathrooms
              </Text>
            </div>
            <Divider type="vertical" style={{ height: "auto", margin: 0 }} />
            <div>
              <Text
                strong
                style={{
                  fontFamily: "Raleway",
                  fontSize: 18,
                  color: "#1e293b",
                  display: "block",
                }}
              >
                {item.squareFeet}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway",
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                Sq. Ft
              </Text>
            </div>
          </div>

          {/* Description */}
          <Paragraph
            style={{
              fontFamily: "Raleway",
              color: "#64748b",
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            {item.description}
          </Paragraph>

          {/* Agent Info */}
          <div
            style={{
              background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
              padding: 20,
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            <Text
              strong
              style={{
                fontFamily: "Raleway",
                fontSize: 14,
                color: "#475569",
                display: "block",
                marginBottom: 12,
              }}
            >
              Property Agent
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <UserOutlined style={{ color: "#bdb890", fontSize: 16 }} />
              <Text style={{ fontFamily: "Raleway", color: "#1e293b" }}>
                {item.agent.name}
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <PhoneOutlined style={{ color: "#bdb890", fontSize: 16 }} />
              <Text style={{ fontFamily: "Raleway", color: "#1e293b" }}>
                {item.agent.phone}
              </Text>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            type="primary"
            size="large"
            block
            icon={<PhoneOutlined />}
            onClick={() => (window.location.href = `tel:${item.agent.phone}`)}
            style={{
              background: "linear-gradient(135deg, #bdb890, #a8a378)",
              border: "none",
              borderRadius: 12,
              height: 48,
              fontFamily: "Raleway",
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 4px 16px rgba(189, 184, 144, 0.4)",
            }}
          >
            Contact Agent
          </Button>
        </div>
      </Card>
    </div>
  );
};

const items = myReviewsData.map((review) => {
  return {
    key: review._id,
    label: review.title,
    children: <ReviewUI review={review} item={review.propertyId} />,
  };
});

function MyReviews() {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      items={items}
    />
  );
}

export default MyReviews;
