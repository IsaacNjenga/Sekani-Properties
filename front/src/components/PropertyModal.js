import {
  Carousel,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Tag,
  Space,
  Rate,
  Card,
  Avatar,
  Button,
  Drawer,
  Tooltip,
  Popconfirm,
  Tabs,
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  StarFilled,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDrawer } from "../contexts/DrawerContext";
import AddReview from "../pages/AddReviews";
import Schedule from "../pages/Schedule";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";
import EditReview from "../pages/EditReview";
import { useState } from "react";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";
// import sekaniVid from "../assets/videos/sekani.mp4";
// import sekaniVid2 from "../assets/videos/sekani2.mp4";
import VideoCarousel from "./VideoCarousel";

const { Title, Text, Paragraph } = Typography;

function PropertyModal({
  openModal,
  setOpenModal,
  loading,
  content,
  propertiesRefresh,
}) {
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
  const [editContent, setEditContent] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const hasUserReviewed = content?.reviews?.some(
    (r) => r.email === currentUser?.email
  );

  const editReview = (id) => {
    if (userLoggedIn) {
      const review = content?.reviews?.find((r) => r._id === id);
      toggleEditReview();
      setEditContent({
        ...content,
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
          propertiesRefresh();
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
    content?.reviews?.length > 0
      ? (
          content.reviews.reduce((sum, r) => sum + r.rating, 0) /
          content.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width="95%"
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 24,
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: "50%",
          }}
        />
      }
      bodyStyle={{
        padding: 0,
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: 16,
        overflow: "hidden",
      }}
      style={{ top: isMobile ? 0 : 20 }}
      styles={{
        body: {
          maxHeight: isMobile ? "100vh" : "90vh",
          overflowY: "auto",
        },
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#000",
          height: isMobile ? "auto" : "100vh",
          width: "auto",
        }}
      >
        <div style={{ width: "100%" }}>
          <Tabs
            defaultActiveKey="images"
            centered
            style={{
              background: "rgba(0,0,0,0.8)",
            }}
            tabBarStyle={{
              marginBottom: 0,
              background: "rgba(0,0,0,0.8)",
            }}
            items={[
              {
                key: "images",
                label: (
                  <span style={{ color: "#fff", fontFamily: "Raleway" }}>
                    <PictureOutlined /> Photos
                  </span>
                ),
                children: (
                  <div
                    style={{
                      height: isMobile ? "auto" : "50vh",
                      minHeight: 300,
                      maxHeight: 400,
                      margin: "auto",
                      width: "50%",
                    }}
                  >
                    <Carousel
                      autoplay
                      autoplaySpeed={4000}
                      arrows
                      dots
                      dotPosition="top"
                      style={{
                        height: "auto",
                        margin: "auto",
                        width: isMobile ? "100%" : "50%",
                      }}
                    >
                      {(Array.isArray(content?.img)
                        ? content.img
                        : [content?.img]
                      ).map((img, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#000",
                            height: isMobile ? "auto" : "90vh",
                            overflow: "hidden",
                            margin: "auto",
                            width: isMobile ? "100%" : "50%",
                            alignContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={img}
                            alt={`Property ${index + 1}`}
                            preview={{
                              mask: "⛶ Click to view",
                            }}
                            style={{
                              width: "100%",
                              height: isMobile ? "auto" : "90vh",
                              objectFit: isMobile ? "cover" : "contain",
                              objectPosition: "center",
                              marginTop: isMobile ? 20 : 0,
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                ),
              },
              {
                key: "videos",
                label: (
                  <span style={{ color: "#fff", fontFamily: "Raleway" }}>
                    <PlayCircleOutlined /> Videos
                  </span>
                ),
                children: (
                  <div
                    style={{
                      height: isMobile ? "auto" : "50vh",
                       minHeight: 300,
                      // maxHeight: 400,
                    }}
                  >
                    {content?.vid?.length === 0 ||
                    content?.vid === undefined ? (
                      <div
                        style={{
                          margin: "auto",
                          width: "50%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            fontFamily: "Raleway",
                            fontSize: "1.6rem",
                          }}
                        >
                          Sorry, there are no videos available yet
                        </Text>
                      </div>
                    ) : (
                      <VideoCarousel content={content?.vid} />
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: isMobile ? 20 : 40, marginTop: 20 }}>
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
                  level={isMobile ? 3 : 2}
                  style={{
                    margin: 0,
                    fontFamily: "Alegreya Sans",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {content?.propertyType}
                  {content?.bedrooms > 0 &&
                    ` • ${content?.bedrooms} BR / ${content?.bathrooms} BA`}
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
                  {content?.address}, {content?.city}, {content?.county}
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
                      content?.status === "Available"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : content?.status === "Pending"
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {content?.status}
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
                {content?.squareFeet && (
                  <StatCard
                    icon={<HomeOutlined />}
                    label="Size"
                    value={`${content.squareFeet} sq. ft`}
                  />
                )}
                {content?.yearBuilt && (
                  <StatCard
                    icon={<CalendarOutlined />}
                    label="Price"
                    value={`KES. ${content.price?.toLocaleString()}`}
                  />
                )}
                {content?.rating > 0 && (
                  <StatCard
                    icon={<StarFilled />}
                    label="Rating"
                    value={`${averageRating} / 5`}
                  />
                )}
              </div>
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
                {content?.description}
              </Paragraph>
            </div>

            {/* Amenities */}
            {content?.amenities?.length > 0 && (
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
                  {content.amenities.map((item, index) => (
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
            {content?.nearby?.length > 0 && (
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
                  {content.nearby.map((item, index) => (
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
                    fontFamily: "Raleway",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Reviews{" "}
                  {content?.reviews?.length > 0 &&
                    `(${content.reviews.length})`}
                </Title>
                {content?.reviews?.length > 0 && (
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

              {content?.reviews?.length === 0 || !content?.reviews ? (
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
                    {content.reviews.slice(0, 2).map((review, idx) => (
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
                                justifyContent: "flex-end",
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
                      justifyContent: isMobile ? "center" : "flex-start",
                    }}
                  >
                    {content.reviews.length > 2 && (
                      <Button
                        size="large"
                        onClick={() => navigate(`/reviews?id=${content?._id}`)}
                        style={{
                          borderRadius: 10,
                          fontFamily: "Raleway",
                          fontWeight: 600,
                        }}
                      >
                        See All {content.reviews.length} Reviews
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
                      {content?.agent?.name}
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
                        {content?.agent?.phone}
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
                    (window.location.href = `tel:${content?.agent?.phone}`)
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
          content={content}
          openReview={openReview}
          toggleReview={toggleReview}
          isMobile={isMobile}
          propertiesRefresh={propertiesRefresh}
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
          propertiesRefresh={propertiesRefresh}
        />
      </Drawer>

      <Drawer open={openSchedule} onClose={toggleSchedule} placement="right">
        <Schedule
          content={content}
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
    </Modal>
  );
}

// Helper Component for Stats Cards
const StatCard = ({ icon, label, value }) => (
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
          fontFamily: "Raleway",
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

export default PropertyModal;
