import Auth from "../pages/Auth.js";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function AuthModal({ openAuthModal, setOpenAuthModal, isMobile }) {
  return (
    <Modal
      open={openAuthModal}
      footer={null}
      centered
      onCancel={() => setOpenAuthModal(false)}
      closable={true}
      width={isMobile ? "auto" : "600px"}
      height={"auto"}
      maskStyle={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
      }}
      bodyStyle={{
        padding: 0,
        height: 'auto',
      }}
      style={{
        padding: 0,
        height: '0vh',
      }}
      closeIcon={
        <CloseOutlined
          style={{
            color: "#fff",
            background: "rgba(0, 0, 0, 0.39)",
            padding: 6,
            borderRadius: "50%",
            fontSize: 25,
            marginBottom: 80,
            marginLeft: 50,
          }}
        />
      }
    >
      <Auth />
    </Modal>
  );
}

export default AuthModal;
