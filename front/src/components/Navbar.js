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
    position: "fixed", // overlay instead of sticky
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100%",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    transition:
      "background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
    background: scrolled
      ? darkMode
        ? "rgba(9, 12, 17, 0)" // dark semi-transparent
        : "rgba(242, 245, 250, 0)" // light semi-transparent
      : "transparent", // fully overlay at top
    backdropFilter: scrolled ? "none" : "none",
    boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0)" : "none",
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
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: "2px solid #918f76",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                cursor: "pointer",
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
          padding: 0,
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
