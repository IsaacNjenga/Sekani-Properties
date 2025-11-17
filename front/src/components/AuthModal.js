import React from "react";
import Auth from "../pages/Auth.js";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function AuthModal({ openAuthModal, setOpenAuthModal, isMobile }) {
  return (
    <Modal
      footer={null}
      open={openAuthModal}
      onCancel={() => setOpenAuthModal(false)}
      width="50%"
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
        background: "transparent",
        borderRadius: 12,
        overflow: "hidden",
      }}
      style={{
        top: isMobile ? 0 : 0,
        background: "transparent",
        padding: 0,
      }}
      styles={{
        body: {
          maxHeight: isMobile ? "100vh" : "100vh",
          overflowY: "auto",
        background: "transparent",
        },
      }}
    >
      <Auth />
    </Modal>
  );
}

export default AuthModal;
