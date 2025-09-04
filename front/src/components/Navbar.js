import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import FooterContent from "./Footer";
import { UserContext } from "../App";
import logo from "../assets/images/logo3.png";

const { Header, Content, Footer } = Layout;

const menuItems = [
  { key: 1, label: "Featured Properties", path: "/properties" },
  { key: 2, label: "About", path: "/about" },
  { key: 3, label: "Contact", path: "/contact" },
];

function Navbar() {
  const { darkMode } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);

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
    height: "80px", // fixed height for smoothness
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
                width: scrolled ? 100 : 200,
                height: scrolled ? 100 : 200,
                borderRadius: "50%",
                border: "2px solid #918f76",
                objectFit: "cover",
                transition: "all 0.3s ease",
                cursor: "pointer",
                margin: "10px 0",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </Link>

          {/* Navigation Menu */}
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
                  }}
                >
                  {label}
                </Link>
              ),
            }))}
          />
        </div>
      </Header>
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
