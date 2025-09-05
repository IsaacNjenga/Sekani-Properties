import { Modal } from "antd";
import React from "react";

function PropertyModal({ openModal, setOpenModal, loading, content }) {
  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      style={{ maxWidth: "95vw" }}
    >
      <pre>{JSON.stringify(content, 2, null)}</pre>
    </Modal>
  );
}

export default PropertyModal;
