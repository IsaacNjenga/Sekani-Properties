import { useState } from "react";
import { Button, Card, Form, Input, Typography, Space, Divider } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { signInWithGoogle } from "../providers/AuthProvider.js";
import axios from "axios";
import { useUser } from "../contexts/UserContext/index.js";

const { Title, Text } = Typography;

function Auth() {
  const [form] = Form.useForm();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useUser();

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
    form.resetFields();
  };

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleBack = () => {
    setShowEmailForm(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      // Handle email/password submission here
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { user, idToken } = await signInWithGoogle();
      console.log(user);

      const res = await axios.post(
        "http://localhost:3001/Sekani/firebase-google-login",
        { idToken }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log("Logged in as:", res.data.user);
      } else console.error(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #bdb890 0%, #8a8560 50%, #6b6848 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px" : "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.1)",
          filter: "blur(80px)",
        }}
      />

      {/* Main Card */}
      <Card
        style={{
          maxWidth: isMobile ? "100%" : 480,
          width: "100%",
          background: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1,
        }}
        bodyStyle={{
          padding: isMobile ? "32px 24px" : "48px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="https://res.cloudinary.com/dinsdfwod/image/upload/v1763372140/logo3_jdp77t.png"
            alt="Logo"
            style={{
              height: isMobile ? 80 : 100,
              marginBottom: 24,
              borderRadius: "50%",
              border: "2px solid #918f76",
            }}
          />
          <Title
            level={2}
            style={{
              margin: 0,
              fontFamily: "Alegreya Sans",
              background: "linear-gradient(135deg, #bdb890, #8a8560)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isSignIn ? "Welcome Back" : "Create Account"}
          </Title>
          <Text
            style={{
              fontSize: 15,
              color: "#64748b",
              fontFamily: "Raleway",
            }}
          >
            {isSignIn
              ? "Sign in to access your account"
              : "Join us to find your dream property"}
          </Text>
        </div>

        {/* Authentication Options or Form */}
        {!showEmailForm ? (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              loading={loading}
              size="large"
              block
              icon={<GoogleOutlined style={{ fontSize: 20 }} />}
              style={{
                height: 56,
                borderRadius: 16,
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: 16,
                border: "2px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#bdb890";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(189, 184, 144, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Continue with Google
            </Button>

            <Divider style={{ margin: "8px 0" }}>
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  fontFamily: "Raleway",
                }}
              >
                Or
              </Text>
            </Divider>

            {/* Email Sign In */}
            <Button
              onClick={handleEmailClick}
              size="large"
              block
              icon={<MailOutlined style={{ fontSize: 20 }} />}
              style={{
                height: 56,
                borderRadius: 16,
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: 16,
                background: "linear-gradient(135deg, #bdb890, #a8a378)",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                boxShadow: "0 4px 16px rgba(189, 184, 144, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(189, 184, 144, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(189, 184, 144, 0.3)";
              }}
            >
              Continue with Email
            </Button>

            {/* Toggle Sign In/Up */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Text style={{ color: "#64748b", fontFamily: "Raleway" }}>
                {isSignIn
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  onClick={toggleSignIn}
                  style={{
                    color: "#bdb890",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {isSignIn ? "Sign Up" : "Sign In"}
                </span>
              </Text>
            </div>
          </Space>
        ) : (
          // Email Form
          <div>
            {/* Back Button */}
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              style={{
                marginBottom: 24,
                color: "#64748b",
                fontFamily: "Raleway",
                fontWeight: 600,
              }}
            >
              Back to options
            </Button>

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              {/* Email */}
              <Form.Item
                label={
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Email Address
                  </Text>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "#bdb890" }} />}
                  placeholder="your@email.com"
                  size="large"
                  style={{
                    borderRadius: 12,
                    fontFamily: "Raleway",
                    border: "2px solid #e2e8f0",
                    height: 48,
                  }}
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label={
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#1e293b",
                    }}
                  >
                    Password
                  </Text>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bdb890" }} />}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  size="large"
                  style={{
                    borderRadius: 12,
                    fontFamily: "Raleway",
                    border: "2px solid #e2e8f0",
                    height: 48,
                  }}
                />
              </Form.Item>

              {/* Confirm Password (Sign Up only) */}
              {!isSignIn && (
                <Form.Item
                  label={
                    <Text
                      strong
                      style={{
                        fontSize: 15,
                        fontFamily: "Raleway",
                        color: "#1e293b",
                      }}
                    >
                      Confirm Password
                    </Text>
                  }
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#bdb890" }} />}
                    placeholder="Confirm your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    size="large"
                    style={{
                      borderRadius: 12,
                      fontFamily: "Raleway",
                      border: "2px solid #e2e8f0",
                      height: 48,
                    }}
                  />
                </Form.Item>
              )}

              {/* Forgot Password (Sign In only) */}
              {isSignIn && (
                <div style={{ textAlign: "right", marginBottom: 24 }}>
                  <Text
                    style={{
                      color: "#bdb890",
                      cursor: "pointer",
                      fontFamily: "Raleway",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Forgot password?
                  </Text>
                </div>
              )}

              {/* Submit Button */}
              <Form.Item style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  style={{
                    height: 56,
                    borderRadius: 16,
                    fontFamily: "Raleway",
                    fontWeight: 600,
                    fontSize: 16,
                    background: "linear-gradient(135deg, #bdb890, #a8a378)",
                    border: "none",
                    boxShadow: "0 4px 16px rgba(189, 184, 144, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(189, 184, 144, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(189, 184, 144, 0.3)";
                  }}
                >
                  {loading
                    ? isSignIn
                      ? "Signing in..."
                      : "Creating account..."
                    : isSignIn
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </Form.Item>

              {/* Toggle Sign In/Up */}
              <div style={{ textAlign: "center" }}>
                <Text style={{ color: "#64748b", fontFamily: "Raleway" }}>
                  {isSignIn
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <span
                    onClick={toggleSignIn}
                    style={{
                      color: "#bdb890",
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {isSignIn ? "Sign Up" : "Sign In"}
                  </span>
                </Text>
              </div>
            </Form>
          </div>
        )}

        {/* Terms & Privacy */}
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#94a3b8",
              fontFamily: "Raleway",
            }}
          >
            By continuing, you agree to our{" "}
            <span
              style={{ color: "#bdb890", cursor: "pointer", fontWeight: 600 }}
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              style={{ color: "#bdb890", cursor: "pointer", fontWeight: 600 }}
            >
              Privacy Policy
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default Auth;
