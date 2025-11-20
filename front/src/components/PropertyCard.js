import React from "react";
import { Card, Carousel, Button, Badge, Tag, Divider, Typography } from "antd";
import { lightTheme } from "../App";
import { useUser } from "../contexts/UserContext";

const { Text, Title } = Typography;

function PropertyCard({ c, viewProperty }) {
  const { isMobile } = useUser();
  return (
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
            height: 300,
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
            {/* <video style={videoStyle} muted autoPlay loop playsInline>
              <source src={SekaniVid} type="video/mp4" />
            </video> */}
            <Carousel
              autoplay
              autoplaySpeed={3800}
              dots={false}
              style={{ height: "100%" }}
            >
              {(Array.isArray(c.img) ? c.img : [c.img]).map((img, i) => (
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
                      : c?.status === "Pending" || c?.status === "Under Offer"
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
              {c.bedrooms} {c.bedrooms > 1 ? "Bedrooms" : "Bedroom"},{" "}
              {c.bathrooms} {c.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
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
        <Title level={isMobile ? 5 : 4} style={{ fontFamily: "Raleway" }}>
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
  );
}

export default React.memo(PropertyCard);
