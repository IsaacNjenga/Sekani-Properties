import React from "react";
import Auth from "../pages/Auth.js";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function AuthModal({ openAuthModal, setOpenAuthModal, isMobile }) {
  return (
    <Modal
      footer={null}
      title="User Authentication"
      open={openAuthModal}
      onCancel={() => setOpenAuthModal(false)}
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
      <Auth />
    </Modal>
  );
}

export default AuthModal;
