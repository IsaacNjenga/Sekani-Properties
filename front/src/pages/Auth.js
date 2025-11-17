import { useState } from "react";
import signInImg from "../assets/images/logo.png";
import signUpImg from "../assets/images/logo3.png";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookFilled,
  GoogleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { signInWithGoogle } from "../providers/AuthProvider.js";
import axios from "axios";
import { useUser } from "../contexts/UserContext/index.js";

const { Title, Text } = Typography;

const containerStyle = {
  position: "relative",
  minHeight: "100vh",
  padding: 0,
  maxWidth: "100vw",
};
const imgStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  objectFit: "contain",
  background: "linear-gradient(to right, #d6a4df, #def7e4)",
};

const innerDivStyle = {
  position: "absolute",
  margin: "auto",
  display: "flex",
  width: "100%",
  borderRadius: 12,
  border: "4px solid #fff",
  maxWidth: "85vw",
  alignContent: "center",
  alignItems: "center",
  alignSelf: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 14px 0 rgba(0, 0, 0, 0.1)",
};

const cardStyle = {
  maxHeight: "95vh",
  height: 600,
  padding: 8,
  borderRadius: 0,
  background: "linear-gradient(to left, rgba(0,0,0,0.26), rgba(0,0,0,0.01))",
  borderColor: "rgba(0,0,0,0)",
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  backdropFilter: "blur(1px)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 5,
  marginTop: 0,
  color: "#ffffff",
};

const labelStyle = {
  marginBottom: 0,
  fontSize: 14,
  fontWeight: 500,
  marginTop: 0,
  color: "#ffffff",
};

const inputStyle = {
  marginBottom: 0,
  borderRadius: 12,
  marginTop: 0,
};

const submitBtnStyle = { padding: 18, borderRadius: 18 };

const socialBtnStyle = {
  padding: "16px 34px",
  borderRadius: 18,
  transition: "all 0.4s ease",
};

const iconStyle = { fontSize: 24 };

const signInTextStyle = { cursor: "pointer" };

function Auth() {
  const [form] = Form.useForm();
  const [isSignIn, setIsSignIn] = useState(true);
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { isMobile } = useUser();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allValues = await form.getFieldsValue();
      console.log(allValues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user, idToken } = await signInWithGoogle();
      console.log(user);
      const res = await axios.post(
        "https://localhost:3001/Sekani/firebase-google-login",
        { idToken }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token); //store  jwt token
        console.log("Logged in as:", res.data.user);
      } else console.error(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <img src={isSignIn ? signInImg : signUpImg} alt="img" style={imgStyle} />
      <div
        style={{ ...innerDivStyle, flexDirection: isMobile ? "column" : "row" }}
      >
        <div style={{ width: isMobile ? "100%" : "30%" }}>
          <Card style={{ ...cardStyle, width: isMobile ? "100%" : 450 }}>
            <Divider style={{ borderColor: "#fff" }}>
              <Title
                level={1}
                style={{ ...titleStyle, fontSize: isMobile ? 30 : 50 }}
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </Title>
            </Divider>
            <div>
              <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                  label={<span style={labelStyle}>Email Address</span>}
                  name={"email"}
                >
                  <Input
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={inputStyle}
                  />
                </Form.Item>
                <Form.Item
                  label={<span style={labelStyle}>Password</span>}
                  name={"password"}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    value={values.password}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={inputStyle}
                    allowClear
                  />
                </Form.Item>
                {!isSignIn && (
                  <Form.Item
                    dependencies={["password"]}
                    hasFeedback
                    label={
                      <span style={labelStyle}>Confirm Your Password</span>
                    }
                    name={"confirmPassword"}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
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
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      style={inputStyle}
                    />
                  </Form.Item>
                )}

                {isSignIn && (
                  <div style={{ marginTop: 0, marginBottom: 10 }}>
                    <Text style={{ color: "#fff", cursor: "pointer" }}>
                      Forgot your password?
                    </Text>
                  </div>
                )}

                <Form.Item>
                  <Button
                    block
                    loading={loading}
                    type="primary"
                    style={submitBtnStyle}
                    htmlType="submit"
                    disabled={!values.email}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {loading
                      ? isSignIn
                        ? "Signing in..."
                        : "Signing up..."
                      : isSignIn
                      ? "Sign in"
                      : "Sign up"}
                  </Button>
                </Form.Item>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: 5,
                    fontWeight: 500,
                  }}
                >
                  {isSignIn ? (
                    <Text
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      Don't have an account?{" "}
                      <span onClick={toggleSignIn} style={signInTextStyle}>
                        Sign Up
                      </span>
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      Already have an account?{" "}
                      <span onClick={toggleSignIn} style={signInTextStyle}>
                        Sign In
                      </span>
                    </Text>
                  )}
                </div>
                <Divider style={{ borderColor: "#fff" }}>
                  <Text
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    Or continue with
                  </Text>
                </Divider>

                <div
                  style={{
                    textAlign: "center",
                    gap: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={handleGoogleSignIn}
                    icon={<GoogleOutlined style={iconStyle} />}
                    style={{
                      ...socialBtnStyle,
                      color: "#4285f4",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <Button
                    icon={<MailOutlined style={iconStyle} />}
                    style={{ ...socialBtnStyle, color: "red" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <Button
                    icon={<FacebookFilled style={iconStyle} />}
                    style={{ ...socialBtnStyle, color: "#3b5998" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              </Form>
            </div>
          </Card>
        </div>
        <div style={{ width: isMobile ? 0 : "70%", display: "none" }}></div>
      </div>
    </div>
  );
}

export default Auth;
