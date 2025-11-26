import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Col,
  Row,
  Typography,
  Tag,
  Space,
  Rate,
  Card,
  Avatar,
  Button,
  Tooltip,
  Popconfirm,
  Image,
  Drawer,
  Spin,
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  StarFilled,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import SekaniHero from "../components/SekaniHero";
import { useUser } from "../contexts/UserContext";
import { useDrawer } from "../contexts/DrawerContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import axios from "axios";
import VideoCarousel from "../components/VideoCarousel";
import AddReview from "../pages/AddReviews";
import EditReview from "./EditReview";
import Schedule from "./Schedule";
import AuthModal from "../components/AuthModal";
import useFetchProperty from "../hooks/fetchProperty";
import { FavouriteFunctions } from "../utils/FavouriteFunctions";

const { Title, Text, Paragraph } = Typography;

const heroContainer = {
  position: "relative",
  width: "100%",
  height: "auto",
  overflow: "hidden",
};

const videoStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 1,
};

function PropertyDetails() {
  const { isMobile } = useUser();
  const {
    toggleReview,
    openReview,
    openSchedule,
    toggleSchedule,
    toggleEditReview,
    openEditReview,
  } = useDrawer();
  const { userLoggedIn, openAuthModal, setOpenAuthModal, currentUser } =
    useAuth();
  const navigate = useNavigate();
  const openNotification = useNotification();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [editContent, setEditContent] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { propertyRefresh, propertyData, propertyDataLoading, fetchProperty } =
    useFetchProperty();
  const { addToFavourites, removeFromFavourites, isInFavourites } =
    FavouriteFunctions();

  // Only fetch once when id changes
  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Safely extract property with fallback
  const property = useMemo(() => {
    return propertyData?.[0] || null;
  }, [propertyData]);

  // Calculate derived values with memoization
  const hasUserReviewed = useMemo(() => {
    if (!property?.reviews || !currentUser?.email) return false;
    return property.reviews.some((r) => r.email === currentUser.email);
  }, [property?.reviews, currentUser?.email]);

  const averageRating = useMemo(() => {
    if (!property?.reviews?.length) return 0;
    const sum = property.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return (sum / property.reviews.length).toFixed(1);
  }, [property?.reviews]);

  const editReview = (id) => {
    if (userLoggedIn) {
      const review = property?.reviews?.find((r) => r._id === id);
      if (review) {
        toggleEditReview();
        setEditContent({
          ...property,
          reviews: review,
        });
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!userLoggedIn) {
      setOpenAuthModal(true);
      return;
    }

    try {
      const res = await axios.delete(`delete-review?id=${reviewId}`);
      if (res.data.success) {
        openNotification("success", "Your review has been deleted", "Success!");
        propertyRefresh();
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "warning",
        "Something went wrong. Please try again or contact us for assistance",
        "There was an error..."
      );
    }
  };

  // Show loading state
  if (propertyDataLoading) {
    return <Spin fullscreen size="large" />;
  }

  if (!property) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <Title level={3}>Property not found</Title>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div style={heroContainer}>
        {!property?.vid?.length ? (
          <video style={videoStyle} muted autoPlay loop playsInline>
            <source src={property?.vid[0]} type="video/mp4" />
          </video>
        ) : (
          <SekaniHero
            heroImg={property.img}
            heroText={property.propertyType || "Property"}
            heroTitle={`${property.address || ""} ${property.city || ""}, ${
              property.county || ""
            }`}
          />
        )}
      </div>

      <div
        style={{ padding: isMobile ? 5 : 20, margin: isMobile ? 10 : "0 90px" }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            <div
              style={{
                background: "#fff",
                padding: isMobile ? 20 : 32,
                borderRadius: 20,
                marginBottom: 24,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <HomeOutlined
                  style={{
                    fontSize: 32,
                    color: "#bdb890",
                  }}
                />
                <Title
                  level={isMobile ? 3 : 1}
                  style={{
                    margin: 0,
                    fontFamily: "Raleway",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {property.propertyType || "Property"}
                  {property.bedrooms > 0 &&
                    ` • ${property.bedrooms} BR / ${property.bathrooms} BA`}
                </Title>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined
                  style={{ fontSize: 20, color: "#bdb890" }}
                />
                <Text
                  style={{
                    fontFamily: "Bodoni Moda",
                    fontSize: 16,
                    color: "#64748b",
                  }}
                >
                  {property.address || "Address not available"},{" "}
                  {property.city || ""}, {property.county || ""}
                </Text>
              </div>
              <div style={{ marginTop: 10, marginBottom: 0 }}>
                <Tag
                  icon={<CheckCircleOutlined />}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    padding: "8px 20px",
                    borderRadius: 24,
                    border: "none",
                    background:
                      property.status === "Available"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : property.status === "Pending"
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    fontFamily: "Raleway",
                  }}
                >
                  {property.status || "Unknown"}
                </Tag>
              </div>

              {/* Quick Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 16,
                  marginTop: 24,
                }}
              >
                {property.squareFeet && (
                  <StatCard
                    icon={<HomeOutlined />}
                    label="Size"
                    value={`${property.squareFeet} sq. ft`}
                  />
                )}
                {property.price && (
                  <StatCard
                    icon={<CalendarOutlined />}
                    label="Price"
                    value={`KES. ${property.price.toLocaleString()}`}
                  />
                )}
                {property.reviews?.length > 0 && (
                  <StatCard
                    icon={<StarFilled />}
                    label="Rating"
                    value={`${averageRating} / 5`}
                  />
                )}
              </div>
            </div>

            {/* Media */}
            {(property.vid?.length > 0 || property.img?.length > 0) && (
              <div
                style={{
                  background: "#fff",
                  padding: isMobile ? 20 : 32,
                  borderRadius: 20,
                  marginBottom: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Card>
                  <Title
                    level={4}
                    style={{ margin: 0, fontFamily: "Bodoni Moda" }}
                  >
                    Media
                  </Title>
                  {property.vid?.length > 0 && (
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        padding: 4,
                      }}
                    >
                      <VideoCarousel
                        content={property.vid}
                        isMobile={isMobile}
                      />
                    </div>
                  )}
                  {property.img?.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile
                          ? "repeat(1, 1fr)"
                          : "repeat(2, 1fr)",
                        gap: 8,
                        padding: 4,
                      }}
                    >
                      {(Array.isArray(property.img)
                        ? property.img
                        : [property.img]
                      )
                        .filter(Boolean)
                        .map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt={`Property ${i + 1}`}
                            preview={{ mask: "Click to view full image" }}
                            style={{
                              width: "100%",
                              height: isMobile ? 180 : 250,
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div
                style={{
                  background: "#fff",
                  padding: isMobile ? 20 : 32,
                  borderRadius: 20,
                  marginBottom: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Bodoni Moda",
                    color: "#1e293b",
                    marginBottom: 16,
                  }}
                >
                  About This Property
                </Title>
                <Paragraph
                  style={{
                    fontFamily: "Raleway",
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: "#475569",
                  }}
                >
                  {property.description}
                </Paragraph>
              </div>
            )}

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div
                style={{
                  background: "#fff",
                  padding: isMobile ? 20 : 32,
                  borderRadius: 20,
                  marginBottom: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Bodoni Moda",
                    color: "#1e293b",
                    marginBottom: 16,
                  }}
                >
                  Amenities & Features
                </Title>
                <Space wrap size={[12, 12]}>
                  {property.amenities.map((item, index) => (
                    <Tag
                      key={index}
                      style={{
                        background: "linear-gradient(135deg, #bdb890, #a8a378)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 14,
                        fontFamily: "Raleway",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {/* Nearby Landmarks */}
            {property.nearby?.length > 0 && (
              <div
                style={{
                  background: "#fff",
                  padding: isMobile ? 20 : 32,
                  borderRadius: 20,
                  marginBottom: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Bodoni Moda",
                    color: "#1e293b",
                    marginBottom: 16,
                  }}
                >
                  Nearby Landmarks
                </Title>
                <Space wrap size={[12, 12]}>
                  {property.nearby.map((item, index) => (
                    <Tag
                      key={index}
                      icon={<EnvironmentOutlined />}
                      style={{
                        background: "#f1f5f9",
                        color: "#334155",
                        border: "1px solid #e2e8f0",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 14,
                        fontFamily: "Raleway",
                      }}
                    >
                      {item}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {/* Reviews Section */}
            <div
              style={{
                background: "#fff",
                padding: isMobile ? 20 : 32,
                borderRadius: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Bodoni Moda",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Reviews{" "}
                  {property.reviews?.length > 0 &&
                    `(${property.reviews.length})`}
                </Title>
                {property.reviews?.length > 0 && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Rate
                      disabled
                      allowHalf
                      value={parseFloat(averageRating)}
                    />
                    <Text
                      strong
                      style={{
                        fontSize: 18,
                        color: "#bdb890",
                        fontFamily: "Bodoni Moda",
                      }}
                    >
                      {averageRating}
                    </Text>
                  </div>
                )}
              </div>

              {!property.reviews || property.reviews.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    background: "#f8fafc",
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontFamily: "Raleway", fontSize: 16 }}>
                    No reviews yet.{" "}
                    <span
                      onClick={() => {
                        if (userLoggedIn) {
                          toggleReview();
                        } else {
                          setOpenAuthModal(true);
                        }
                      }}
                      style={{
                        color: "#bdb890",
                        cursor: "pointer",
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                    >
                      Be the first to review
                    </span>
                  </Text>
                </div>
              ) : (
                <>
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ width: "100%" }}
                  >
                    {property.reviews.slice(0, 2).map((review, idx) => (
                      <Card
                        key={review._id || idx}
                        style={{
                          borderRadius: 12,
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                        bodyStyle={{ padding: 20 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 12,
                            flexWrap: "wrap",
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <Avatar
                              size={40}
                              style={{
                                background:
                                  "linear-gradient(135deg, #bdb890, #a8a378)",
                                fontSize: 18,
                                fontWeight: 600,
                              }}
                            >
                              {review.name?.[0] || "?"}
                            </Avatar>
                            <Text
                              strong
                              style={{
                                fontFamily: "Raleway",
                                fontSize: 16,
                              }}
                            >
                              {review.name || "Anonymous"}
                            </Text>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <Rate
                              disabled
                              allowHalf
                              value={review.rating || 0}
                              style={{ fontSize: 16 }}
                            />
                            <Text style={{ fontSize: 14, color: "#bdb890" }}>
                              ({review.rating || 0})
                            </Text>
                          </div>
                        </div>
                        <Paragraph
                          style={{
                            fontFamily: "Raleway",
                            color: "#64748b",
                            marginBottom: 0,
                            fontSize: 15,
                          }}
                        >
                          {review.review}
                        </Paragraph>

                        {review.email === currentUser?.email && (
                          <div
                            style={{
                              marginTop: 12,
                              display: "flex",
                              gap: 10,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Tooltip title="Edit your review">
                              <Button
                                onClick={() => editReview(review._id)}
                                icon={<EditOutlined />}
                                type="primary"
                                shape="circle"
                              />
                            </Tooltip>
                            <Tooltip title="Delete your review">
                              <Popconfirm
                                title="Delete review?"
                                description="This action cannot be undone."
                                open={open}
                                onConfirm={() => {
                                  setConfirmLoading(true);
                                  deleteReview(review._id).finally(() => {
                                    setOpen(false);
                                    setConfirmLoading(false);
                                  });
                                }}
                                okButtonProps={{ loading: confirmLoading }}
                                onCancel={() => setOpen(false)}
                              >
                                <Button
                                  icon={<DeleteOutlined />}
                                  onClick={() => setOpen(true)}
                                  danger
                                  type="primary"
                                  shape="circle"
                                />
                              </Popconfirm>
                            </Tooltip>
                          </div>
                        )}
                      </Card>
                    ))}
                  </Space>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 24,
                      flexWrap: "wrap",
                      justifyContent: isMobile ? "center" : "flex-start",
                    }}
                  >
                    {property.reviews.length > 2 && (
                      <Button
                        size="large"
                        onClick={() => navigate(`/reviews?id=${property._id}`)}
                        style={{
                          borderRadius: 10,
                          fontFamily: "Raleway",
                          fontWeight: 600,
                        }}
                      >
                        See All {property.reviews.length} Reviews
                      </Button>
                    )}
                    {hasUserReviewed ? (
                      <Button
                        type="text"
                        size="large"
                        disabled
                        style={{
                          background:
                            "linear-gradient(135deg, #bdb890, #a8a378)",
                          border: "none",
                          borderRadius: 10,
                          fontFamily: "Raleway",
                          fontWeight: 600,
                          boxShadow: "0 4px 12px rgba(189, 184, 144, 0.3)",
                          color: "white",
                        }}
                      >
                        You have reviewed this property
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          if (userLoggedIn) {
                            toggleReview();
                          } else {
                            setOpenAuthModal(true);
                          }
                        }}
                        style={{
                          background:
                            "linear-gradient(135deg, #bdb890, #a8a378)",
                          border: "none",
                          borderRadius: 10,
                          fontFamily: "Raleway",
                          fontWeight: 600,
                          boxShadow: "0 4px 12px rgba(189, 184, 144, 0.3)",
                        }}
                      >
                        Write a Review
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>

          {/* Right Column - Agent & CTA */}
          <Col xs={24} lg={8}>
            {property.agent && (
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                  padding: isMobile ? 24 : 32,
                  borderRadius: 20,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  position: isMobile ? "relative" : "sticky",
                  top: 20,
                }}
              >
                <div>
                  <Title
                    level={4}
                    style={{
                      fontFamily: "Bodoni Moda",
                      color: "#fff",
                      marginBottom: 24,
                      textAlign: "center",
                    }}
                  >
                    Contact Agent
                  </Title>

                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      padding: 24,
                      borderRadius: 16,
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <Avatar
                        size={80}
                        src={
                          "https://plus.unsplash.com/premium_photo-1726768854379-105f9aeef18d?w=900"
                        }
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text
                          strong
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontFamily: "Raleway",
                            display: "block",
                            marginBottom: 8,
                          }}
                        >
                          {property.agent.name || "Agent"}
                        </Text>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                          }}
                        >
                          <PhoneOutlined style={{ color: "#bdb890" }} />
                          <Text
                            style={{
                              color: "#cbd5e1",
                              fontFamily: "Raleway",
                              fontSize: 16,
                            }}
                          >
                            {property.agent.phone || "No phone"}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Space
                    direction="vertical"
                    size={12}
                    style={{ width: "100%" }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<PhoneOutlined />}
                      onClick={() =>
                        (window.location.href = `tel:${property.agent.phone}`)
                      }
                      disabled={!property.agent.phone}
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
                      Call Agent
                    </Button>
                    <Button
                      size="large"
                      block
                      icon={<CalendarOutlined />}
                      onClick={() => {
                        if (userLoggedIn) {
                          toggleSchedule();
                        } else {
                          setOpenAuthModal(true);
                        }
                      }}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff",
                        borderRadius: 12,
                        height: 48,
                        fontFamily: "Raleway",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      Schedule Viewing
                    </Button>
                    <Button
                      size="large"
                      block
                      icon={
                        isInFavourites(property) ? (
                          <HeartFilled
                            style={{ color: "#b0aa94", fontSize: 14 }}
                          />
                        ) : (
                          <HeartOutlined
                            style={{ color: "#b0aa94", fontSize: 14 }}
                          />
                        )
                      }
                      onClick={() => {
                       if (isInFavourites(property)) {
                    removeFromFavourites(property._id);
                  } else {
                    addToFavourites(property);
                    openNotification("success", "", "Added!");
                  }
                      }}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff",
                        borderRadius: 12,
                        height: 48,
                        fontFamily: "Raleway",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      Add to favourites
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <Drawer open={openReview} onClose={toggleReview} placement="right">
        <AddReview
          content={property}
          openReview={openReview}
          toggleReview={toggleReview}
          isMobile={isMobile}
          propertyRefresh={propertyRefresh}
        />
      </Drawer>

      <Drawer
        open={openEditReview}
        onClose={toggleEditReview}
        placement="right"
      >
        <EditReview
          content={editContent}
          openEditReview={openEditReview}
          toggleEditReview={toggleEditReview}
          isMobile={isMobile}
          propertyRefresh={propertyRefresh}
        />
      </Drawer>

      <Drawer open={openSchedule} onClose={toggleSchedule} placement="right">
        <Schedule
          content={property}
          openSchedule={openSchedule}
          toggleSchedule={toggleSchedule}
          isMobile={isMobile}
        />
      </Drawer>

      <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        isMobile={isMobile}
      />
    </div>
  );
}

export const StatCard = ({ icon, label, value }) => (
  <div
    style={{
      background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
      padding: 16,
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        fontSize: 24,
        color: "#bdb890",
      }}
    >
      {icon}
    </div>
    <div>
      <Text
        style={{
          display: "block",
          fontSize: 12,
          color: "#64748b",
          fontFamily: "Bodoni Moda",
        }}
      >
        {label}
      </Text>
      <Text
        strong
        style={{
          fontSize: 16,
          color: "#1e293b",
          fontFamily: "Raleway",
        }}
      >
        {value}
      </Text>
    </div>
  </div>
);

export default PropertyDetails;
