import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import FooterContent from "./Footer";
import { UserContext } from "../App";
import logo from "../assets/images/logo3.png";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const menuItems = [
  { key: 1, label: "Home", path: "/" },
  { key: 2, label: "Featured Properties", path: "/properties" },
  { key: 3, label: "About", path: "/about" },
  { key: 4, label: "Contact Us", path: "/contact" },
];

function Navbar() {
  const { darkMode, isMobile } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100%",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.4s ease", // smoother catch-all
    transform: "translateY(0)",
    background: scrolled ? "rgba(9, 12, 17, 0.44)" : "rgba(9, 12, 17, 0)", // transparent with alpha instead of "transparent"
    backdropFilter: scrolled ? "blur(2px)" : "blur(0px)", // animatable
    boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.4)" : "0 0 0 rgba(0,0,0,0)", // animatable baseline
    height: "auto",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={headerStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: scrolled ?85 : isMobile ? 150 : 200,
                height: scrolled ? 85 : isMobile ? 150 : 200,
                borderRadius: "50%",
                border: "2px solid #918f76",
                objectFit: "cover",
                transition: "all 0.3s ease",
                cursor: "pointer",
                margin: "3px 0",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </Link>

          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <Button
                type="text"
                icon={
                  <MenuOutlined style={{ color: "#ffffff", fontSize: 20 }} />
                }
                onClick={toggleDrawer}
              />
            </div>
          ) : (
            <Menu
              theme={darkMode ? "dark" : "light"}
              mode="horizontal"
              style={{
                flex: 1,
                justifyContent: "flex-end",
                background: "transparent",
                borderBottom: "none",
              }}
              items={menuItems.map(({ key, label, path }) => ({
                key,
                label: (
                  <Link
                    to={path}
                    style={{
                      fontSize: 22,
                      fontFamily: "Alegreya Sans",
                      fontWeight: 300,
                      color: "#ffffff",
                      letterSpacing:1.5
                    }}
                  >
                    {label}
                  </Link>
                ),
              }))}
            />
          )}
        </div>
      </Header>
      <Drawer
        placement="right"
        width={300}
        onClose={toggleDrawer}
        open={drawerOpen}
        style={{ backgroundColor: "#eae4ace8" }}
        closeIcon={
          <CloseOutlined
            style={{
              color: "#333",
            }}
          />
        }
      >
        <Menu
          mode="vertical"
          style={{
            background: "rgb(0,0,0,0)",
            borderColor: "rgb(0,0,0,0)",
            fontFamily: "Raleway",
            fontWeight: "bold",
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.path}>
              <Link
                to={item.path}
                style={{
                  color: "#333",
                  textDecoration: "none",
                  fontFamily: "Alegreya Sans",
                }}
              >
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
      <Content
        style={{
          margin: 0,
          //paddingTop: `${headerHeight}px`,
          minHeight: "100vh",
          background: darkMode ? "#090c11" : "#f2f5fa",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          background: "#918f76",
        }}
      >
        <FooterContent />
      </Footer>
    </Layout>
  );
}

export default Navbar;

//247247

//acc 718881