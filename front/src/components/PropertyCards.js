import { Button, Card, Carousel, Space, Tag, Typography, Tooltip } from "antd";
import "../assets/css/home.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import {
  EnvironmentOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import axios from "axios";
//import { useNotification } from "../contexts/NotificationContext";
import { FavouriteFunctions } from "../utils/FavouriteFunctions";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

function PropertyCards({ c }) {
  const { isMobile } = useUser();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(c?.analytics[0]?.likes || 0);
  const { addToFavourites, removeFromFavourites, isInFavourites } =
    FavouriteFunctions();

  useEffect(() => {
    setLikes(c?.analytics[0]?.likes || 0);
  }, [c]);

  if (!c) return;

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        minHeight: 200,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        background: "#fff",
        border: "none",
        transition: "all 0.3s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      bodyStyle={{
        padding: "15px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      cover={
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? 280 : 300,
            overflow: "hidden",
          }}
        >
          <Carousel
            autoplay
            autoplaySpeed={3800}
            fade
            dots={false}
            style={{ height: "100%" }}
          >
            {(Array.isArray(c?.img) ? c?.img : [c?.img]).map((img, i) => (
              <div key={i} style={{ width: "100%", height: 300 }}>
                <img
                  src={img}
                  alt={c.key}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    display: "block",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Status Badge */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 10,
              zIndex: 2,
            }}
          >
            <Tag
              style={{
                background:
                  c.status === "Available"
                    ? "linear-gradient(135deg, #53c41aa3, #73d13d91)"
                    : "linear-gradient(135deg, #faad14ae, #ffc53dac)",
                color: "white",
                border: "none",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
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
              right: 2,
              zIndex: 2,
            }}
          >
            <Tag
              icon={
                <HomeOutlined
                  style={{
                    fontSize: 12,
                    fontWeight: 200,
                  }}
                />
              }
              style={{
                background: "rgba(255, 255, 255, 0.79)",
                backdropFilter: "blur(10px)",
                color: "#919075",
                border: "none",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
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
              right: 10,
              zIndex: 2,
              display: "flex",
              gap: 8,
              flexDirection: "column",
            }}
          >
            <Tooltip
              title={
                isInFavourites(c)
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
              placement="right"
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 20,
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onClick={() => {
                  if (isInFavourites(c)) {
                    removeFromFavourites(c._id, currentUser.email);
                    setLikes((prev) => Math.max(prev - 1, 0));
                  } else {
                    addToFavourites(c, currentUser.email);
                    setLikes((prev) => prev + 1);
                    //openNotification("success", "", "Added!");
                  }
                }}
              >
                {isInFavourites(c) ? (
                  <HeartFilled style={{ color: "#b0aa94", fontSize: 14 }} />
                ) : (
                  <HeartOutlined style={{ color: "#b0aa94", fontSize: 14 }} />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#595959",
                  }}
                >
                  {likes}
                </Text>
              </div>
            </Tooltip>
            <div
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
                borderRadius: 20,
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <EyeOutlined style={{ color: "#8c8c8c", fontSize: 14 }} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#595959",
                }}
              >
                {c?.analytics[0]?.clicks || 0}
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
            <EnvironmentOutlined style={{ color: "#bdb890", fontSize: 16 }} />
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
          level={isMobile ? 5 : 4}
          style={{
            marginTop: 0,
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "Raleway",
            color: "#1e293b",
            fontSize: isMobile ? 14 : 18,
            fontWeight: 500,
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
            padding: 0,
          }}
        >
          <div>
            <Title
              level={5}
              style={{
                fontFamily: "Abril Fatface",
                margin: 0,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontSize: isMobile ? 12 : 16,
                color: "#54534cff",
                letterSpacing: 1,
                padding: 0,
              }}
            >
              KES {c.price.toLocaleString()}
            </Title>
          </div>

          {/* View Details Button */}
          <Button
            type="primary"
            style={{
              background: "linear-gradient(135deg, #b0aa94, #b0aa94)",
              borderRadius: 10,
              padding: "3px 8px",
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
            onClick={() => {
              navigate(`/properties/property?id=${c._id}`);
              const url = `${process.env.REACT_APP_API_URL}/analytics/clicks/${c._id}`;
              const url2 = `${process.env.REACT_APP_API_URL}/analytics/views/${c._id}`;

              if (navigator.sendBeacon) {
                navigator.sendBeacon(url);
                navigator.sendBeacon(url2);
              } else {
                axios.all([axios.post(url), axios.post(url2)]).catch(() => {});
              }
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 300,
                fontSize: 13,
                fontFamily: "Raleway",
              }}
            >
              View Details
            </Text>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default PropertyCards;
