import React, { useState } from "react";
import {
  Card,
  Image,
  Typography,
  Avatar,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  Button,
  Popconfirm,
} from "antd";
import {
  HeartOutlined,
  StarOutlined,
  CalendarOutlined,
  MailOutlined,
  TrophyOutlined,
  HeartFilled,
  StarFilled,
} from "@ant-design/icons";
import MyFavourites from "./MyFavourites";
import MyReviews from "./MyReviews";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;

const MySchedules = () => (
  <div style={{ padding: "40px 20px", textAlign: "center" }}>
    <div style={{ fontSize: "64px", marginBottom: "16px" }}>📅</div>
    <Title level={3}>Your Schedules</Title>
    <Text style={{ color: "#8c8c8c" }}>
      Coming soon! Schedule property viewings here
    </Text>
  </div>
);

const tabListNoTitle = [
  {
    key: "favourites",
    label: (
      <Space>
        <HeartOutlined />
        <span>My Favourites</span>
      </Space>
    ),
  },
  {
    key: "reviews",
    label: (
      <Space>
        <StarOutlined />
        <span>My Reviews</span>
      </Space>
    ),
  },
  {
    key: "schedule",
    label: (
      <Space>
        <CalendarOutlined />
        <span>My Schedules</span>
      </Space>
    ),
  },
];

const contentListNoTitle = {
  favourites: <MyFavourites />,
  reviews: <MyReviews />,
  schedule: <MySchedules />,
};

function UserPage() {
  const { isMobile } = useUser();
  const { currentUser, logout } = useAuth();
  const [activeTabKey, setActiveTabKey] = useState("favourites");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const user = {
    avatar: currentUser?.photoURL,
    name: currentUser?.displayName,
    email: currentUser?.email,
    memberSince: "January 2024",
    stats: {
      favourites: 12,
      reviews: 8,
      viewings: 5,
    },
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        minHeight: "100vh",
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          position: "relative",
          height: 500,
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src="https://plus.unsplash.com/premium_photo-1681412205156-bb506a4ea970?w=900"
          alt="Hero Background"
          loading="lazy"
          width="100%"
          height="100%"
          preview={false}
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(173, 149, 76, 0.37) 0%, rgba(207, 210, 110, 0.34) 100%)",
          }}
        />

        {/* Decorative Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.1,
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="heroPattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="30" cy="30" r="3" fill="white" />
                <circle cx="0" cy="0" r="3" fill="white" />
                <circle cx="60" cy="60" r="3" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroPattern)" />
          </svg>
        </div>

        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: isMobile ? "10px" : "30px",
            color: "#fff",
          }}
        >
          {currentUser?.photoURL ? (
            <Avatar src={currentUser?.photoURL} size={isMobile ? 90 : 100} />
          ) : (
            <Avatar size={isMobile ? 90 : 100}>
              {currentUser?.displayName[0]}
            </Avatar>
          )}

          <Title
            level={1}
            style={{
              color: "#fff",
              fontFamily: "Bodoni Moda",
              fontWeight: 600,
              fontSize: isMobile ? 32 : 48,
              margin: 0,
              marginBottom: 6,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {user.name}
          </Title>

          <Space
            direction={isMobile ? "vertical" : "horizontal"}
            size={isMobile ? 8 : 16}
            style={{ marginBottom: 8 }}
          >
            <Space>
              <MailOutlined style={{ fontSize: 16 }} />
              <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: 15 }}>
                {user.email}
              </Text>
            </Space>
          </Space>

          <Tag
            icon={<TrophyOutlined />}
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Member since {user.memberSince}
          </Tag>
        </div>

        {/* Stats Card - Floating */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 10 : 5,
            left: "50%",
            transform: "translateX(-50%)",
            width: isMobile ? "90%" : "auto",
            zIndex: 20,
          }}
        >
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              border: "none",
              background: "white",
            }}
            bodyStyle={{ padding: isMobile ? "20px 16px" : "16px 36px" }}
          >
            <Row gutter={[32, 16]} style={{ textAlign: "center" }}>
              <Col xs={8} sm={8}>
                <Statistic
                  title={
                    <Space>
                      <HeartFilled style={{ color: "#ff4d4f" }} />
                      <span>Favourites</span>
                    </Space>
                  }
                  value={user.stats.favourites}
                  valueStyle={{
                    color: "#667eea",
                    fontSize: isMobile ? 24 : 32,
                    fontWeight: 600,
                  }}
                />
              </Col>
              <Col xs={8} sm={8}>
                <Statistic
                  title={
                    <Space>
                      <StarFilled style={{ color: "gold" }} />
                      <span>Reviews</span>
                    </Space>
                  }
                  value={user.stats.reviews}
                  valueStyle={{
                    color: "#667eea",
                    fontSize: isMobile ? 24 : 32,
                    fontWeight: 600,
                  }}
                />
              </Col>
              <Col xs={8} sm={8}>
                <Statistic
                  title={
                    <Space>
                      <CalendarOutlined style={{ color: "#52c41a" }} />
                      <span>Viewings</span>
                    </Space>
                  }
                  value={user.stats.viewings}
                  valueStyle={{
                    color: "#667eea",
                    fontSize: isMobile ? 24 : 32,
                    fontWeight: 600,
                  }}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "60px 16px 40px" : "40px 24px 40px",
        }}
      >
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            border: "none",
            background: "whitesmoke",
          }}
          bodyStyle={{ padding: 0 }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: "large",
            tabBarStyle: {
              padding: "0 24px",
              marginBottom: 0,
            },
          }}
        >
          <div style={{ padding: isMobile ? "24px 16px" : "16px 12px" }}>
            {contentListNoTitle[activeTabKey]}
          </div>
        </Card>

        {/* Help Section */}
        <Card
          style={{
            marginTop: 24,
            borderRadius: 16,
            background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
            border: "1px solid #e8e8f5",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
          bodyStyle={{ padding: isMobile ? 20 : 24 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              💬
            </div>
            <div style={{ flex: 1 }}>
              <Text
                strong
                style={{ fontSize: 16, display: "block", marginBottom: 4 }}
              >
                Need Help?
              </Text>
              <Text style={{ color: "#64748b" }}>
                If you have any questions or need assistance, contact us at{" "}
                <a
                  href="mailto:support@sekani.com"
                  style={{ color: "#667eea", fontWeight: 600 }}
                >
                  support@sekani.com
                </a>
              </Text>
            </div>
          </div>
        </Card>
      </div>

      <div
        style={{
          margin: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Popconfirm
          title="Logout"
          description="Are you sure you want to logout?"
          open={open}
          onConfirm={() => {
            setConfirmLoading(true);

            setTimeout(() => {
              logout();
              setOpen(false);
              setConfirmLoading(false);
            }, 1000);
          }}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={() => setOpen(false)}
        >
          <Button type="primary" danger onClick={() => setOpen(true)}>
            Logout
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default UserPage;
