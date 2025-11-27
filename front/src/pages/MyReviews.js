import {
  CaretRightOutlined,
  CalendarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Card, Collapse, Rate, Tag, Typography, Avatar } from "antd";
import { myReviewsData } from "../assets/data/mockData";
import PropertyCards from "../components/PropertyCards";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../contexts/UserContext";

const { Title, Text, Paragraph } = Typography;

const ReviewUI = ({ review, item }) => {
    const {isMobile} = useUser()
  return (
    <div style={{ padding: "8px 0" }}>
      <Card
        style={{
          borderRadius: 16,
          background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
          border: "1px solid #e8e8f5",
          marginBottom: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          backgroundFilter: "blur(4px)",
        }}
        bodyStyle={{ padding: 20 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar
              size={56}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {review.name[0]}
            </Avatar>
            <div>
              <Text
                strong
                style={{ fontSize: 16, display: "block", marginBottom: 4 }}
              >
                {review.name}
              </Text>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Rate
                  disabled
                  allowHalf
                  value={review.rating}
                  style={{ fontSize: 16 }}
                />
                <Text strong style={{ color: "#faad14", fontSize: 16 }}>
                  {review.rating}
                </Text>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Tag
              icon={<CalendarOutlined />}
              style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: "4px 12px",
              }}
            >
              {formatDistanceToNow(review.createdAt)} ago
            </Tag>
          </div>
        </div>

        <Paragraph
          style={{
            fontFamily: "Raleway",
            fontSize: 15,
            lineHeight: 1.7,
            color: "#475569",
            margin: 0,
            padding: 16,
            background: "white",
            borderRadius: 12,
            border: "1px solid #f0f0f0",
          }}
        >
          "{review.review}"
        </Paragraph>
      </Card>

      <div style={{ margin: "auto", width: isMobile?'100%':"50%" }}>
        <PropertyCards c={item} />
      </div>
    </div>
  );
};

function MyReviews() {
  const items = myReviewsData.map((review) => ({
    key: review._id,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <StarFilled style={{ color: "#faad14", fontSize: 18 }} />
        <div>
          <Text
            strong
            style={{ fontSize: 15, display: "block", fontFamily: "Raleway" }}
          >
            {review.title}
          </Text>
          <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
            {review.propertyId?.propertyType} • {review.propertyId?.city}
          </Text>
        </div>
      </div>
    ),
    children: <ReviewUI review={review} item={review.propertyId} />,
  }));

  return (
    <div style={{ padding: 0 }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 8 }}>
          My Reviews
        </Title>
        <Text style={{ color: "#64748b", fontSize: 15 }}>
          View all your property reviews and ratings
        </Text>
      </div>

      <Collapse
        bordered={false}
        defaultActiveKey={[myReviewsData[0]?._id]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 90 : 0}
            style={{ fontSize: 16, color: "#919075" }}
          />
        )}
        items={items}
        style={{
          background: "#9190752b",
        }}
        expandIconPosition="end"
      />
    </div>
  );
}

export default MyReviews;
