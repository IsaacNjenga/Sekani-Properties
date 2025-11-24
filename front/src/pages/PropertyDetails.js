import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RealEstateData } from "../assets/data/mockData";
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
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  StarFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";
import { StatCard } from "../components/PropertyModal";
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

const { Title, Text, Paragraph } = Typography;

const heroContainer = {
  position: "relative",
  width: "100%",
  height: "100vh",
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  //const id = useParams();
  console.log(id);

  const [editContent, setEditContent] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { propertyRefresh, propertyData, propertyDataLoading, fetchProperty } =
    useFetchProperty();

  useEffect(() => {
    fetchProperty(id);
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (propertyData) {
      console.log(propertyData);
    }
  }, [propertyData]);

  const property = RealEstateData[0];

  const hasUserReviewed = property?.reviews?.some(
    (r) => r.email === currentUser?.email
  );

  const editReview = (id) => {
    if (userLoggedIn) {
      const review = property?.reviews?.find((r) => r._id === id);
      toggleEditReview();
      setEditContent({
        ...property,
        reviews: review,
      });
    } else {
      setOpenAuthModal(true);
    }
  };

  const deleteReview = async (id) => {
    if (userLoggedIn) {
      try {
        const res = await axios.delete(`delete-review?id=${id}`);
        if (res.data.success) {
          openNotification(
            "success",
            "Your review has been deleted",
            "Success!"
          );
          //propertiesRefresh();
        }
      } catch (error) {
        console.error(error);
        openNotification(
          "warning",
          "Something went wrong. Please try again or contact us for assistance",
          "There was an error..."
        );
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  // Calculate average rating
  const averageRating =
    property?.reviews?.length > 0
      ? (
          property.reviews.reduce((sum, r) => sum + r.rating, 0) /
          property.reviews.length
        ).toFixed(1)
      : 0;

  //   return <div>{id}</div>;
  return (
    <div>
      <div style={heroContainer}>
        <video style={videoStyle} muted autoPlay loop playsInline>
          <source src={property.vid[0]} type="video/mp4" />
        </video>
      </div>

      <div
        style={{ padding: isMobile ? 5 : 20, margin: isMobile ? 10 : "0 90px" }}
      >
        <Row gutter={[32, 32]}>
          {/* Left Column - Main Info */}

          <Col xs={24} lg={16}>
            {/* Property Title & Location */}
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
                    fontFamily: "Alegreya Sans",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {property?.propertyType}
                  {property?.bedrooms > 0 &&
                    ` • ${property?.bedrooms} BR / ${property?.bathrooms} BA`}
                </Title>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined
                  style={{ fontSize: 20, color: "#bdb890" }}
                />
                <Text
                  style={{
                    fontFamily: "Raleway",
                    fontSize: 16,
                    color: "#64748b",
                  }}
                >
                  {property?.address}, {property?.city}, {property?.county}
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
                      property?.status === "Available"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : property?.status === "Pending"
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {property?.status}
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
                {property?.squareFeet && (
                  <StatCard
                    icon={<HomeOutlined />}
                    label="Size"
                    value={`${property.squareFeet} sq. ft`}
                  />
                )}
                {property?.yearBuilt && (
                  <StatCard
                    icon={<CalendarOutlined />}
                    label="Price"
                    value={`KES. ${property.price?.toLocaleString()}`}
                  />
                )}
                {property?.rating > 0 && (
                  <StatCard
                    icon={<StarFilled />}
                    label="Rating"
                    value={`${averageRating} / 5`}
                  />
                )}
              </div>
            </div>

            {/* Media */}
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
                <Title>Media</Title>{" "}
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    padding: 4,
                  }}
                >
                  <VideoCarousel content={property?.vid} isMobile={isMobile} />
                </div>
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
                    : [property?.img]
                  ).map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`Property ${i + 1}`}
                      style={{
                        width: "100%",
                        height: isMobile ? 180 : 250,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  ))}
                </div>{" "}
              </Card>
            </div>

            {/* Description */}
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
                  fontFamily: "Raleway",
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
                {property?.description}
              </Paragraph>
            </div>

            {/* Amenities */}
            {property?.amenities?.length > 0 && (
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
                    fontFamily: "Raleway",
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
            {property?.nearby?.length > 0 && (
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
                    fontFamily: "Raleway",
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
                  justifyproperty: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Raleway",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Reviews{" "}
                  {property?.reviews?.length > 0 &&
                    `(${property.reviews.length})`}
                </Title>
                {property?.reviews?.length > 0 && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Rate
                      disabled
                      allowHalf
                      value={parseFloat(averageRating)}
                    />
                    <Text strong style={{ fontSize: 18, color: "#bdb890" }}>
                      {averageRating}
                    </Text>
                  </div>
                )}
              </div>

              {property?.reviews?.length === 0 || !property?.reviews ? (
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
                      onClick={toggleReview}
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
                        key={idx}
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
                            justifyproperty: "space-between",
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
                              {review.name[0]}
                            </Avatar>
                            <Text
                              strong
                              style={{
                                fontFamily: "Raleway",
                                fontSize: 16,
                              }}
                            >
                              {review.name}
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
                              value={review.rating}
                              style={{ fontSize: 16 }}
                            />
                            <Text style={{ fontSize: 14, color: "#bdb890" }}>
                              ({review.rating})
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

                        <div style={{ marginTop: 8 }}>
                          {review.email === currentUser?.email ? (
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                justifyproperty: "flex-end",
                              }}
                            >
                              <Tooltip title="Edit your review">
                                <Button
                                  onClick={() => {
                                    editReview(review._id);
                                  }}
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
                                    setTimeout(() => {
                                      deleteReview(review._id);
                                      setOpen(false);
                                      setConfirmLoading(false);
                                    }, 1000);
                                  }}
                                  okButtonProps={{ loading: confirmLoading }}
                                  onCancel={() => setOpen(false)}
                                >
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      setOpen(true);
                                    }}
                                    danger
                                    type="primary"
                                    shape="circle"
                                  />
                                </Popconfirm>
                              </Tooltip>
                            </div>
                          ) : null}
                        </div>
                      </Card>
                    ))}
                  </Space>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 24,
                      flexWrap: "wrap",
                      justifyproperty: isMobile ? "center" : "flex-start",
                    }}
                  >
                    {property.reviews.length > 2 && (
                      <Button
                        size="large"
                        onClick={() => navigate(`/reviews?id=${property?._id}`)}
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
            {/* Agent Card */}
            <div
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                padding: isMobile ? 24 : 32,
                borderRadius: 20,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                position: isMobile ? "relative" : "sticky",
                top: 20,
              }}
            >
              <Title
                level={4}
                style={{
                  fontFamily: "Raleway",
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
                    icon={<UserOutlined />}
                    style={{
                      background: "linear-gradient(135deg, #bdb890, #a8a378)",
                      fontSize: 32,
                    }}
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
                      {property?.agent?.name}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyproperty: "center",
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
                        {property?.agent?.phone}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<PhoneOutlined />}
                  onClick={() =>
                    (window.location.href = `tel:${property?.agent?.phone}`)
                  }
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
              </Space>
            </div>
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

export default PropertyDetails;
