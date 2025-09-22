import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Slider,
  Space,
  Typography,
  Card,
} from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const dividerStyle = { margin: "8px 0", borderColor: "#e0e0e0" };

const dropDownItems = [
  { key: 1, label: "Name (A-Z)" },
  { key: 2, label: "Name (Z-A)" },
  { key: 3, label: "Lowest price" },
  { key: 4, label: "Highest price" },
  { key: 5, label: "Property Type" },
  { key: 6, label: "Year (Asc)" },
  { key: 7, label: "Year (Desc)" },
];

const sliderMarks = {
  10000: "KES 10,000",
  100000: "KES 100,000",
};

function FilterComponent() {
  const [sort, setSort] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  const menuClickHandler = (e) => {
    console.log(e.key);
    setSort(e.key);
  };

  const menuProps = { items: dropDownItems, onClick: menuClickHandler };

  const onCheck = (e) => {
    console.log(e.target.checked);
  };

  const SectionHeader = ({ title, onClear }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
      }}
    >
      <Title level={5} style={{ margin: 0 }}>
        {title}
      </Title>
      {onClear && (
        <Button
          type="link"
          size="small"
          onClick={onClear}
          style={{ padding: 0, color: "#1890ff" }}
        >
          Clear
        </Button>
      )}
    </div>
  );

  return (
    <Card
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: 8,

      }}
    >
      {/* Sort Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          Sorting By:
        </Title>
        <Dropdown menu={menuProps}>
          <Button
            size="small"
            style={{
              background: "#f5f5f5",
              borderRadius: 6,
              border: "1px solid #d9d9d9",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>{sort ? `Selected: ${sort}` : "Sort By"}</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Divider style={dividerStyle} />

      {/* Locations Filter */}
      <SectionHeader title="Locations" onClear={() => console.log("Clear locations")} />
      <Space direction="vertical" style={{ width: "100%", paddingLeft: 4 }}>
        <Checkbox onChange={onCheck}>Nairobi</Checkbox>
        <Checkbox onChange={onCheck}>Mombasa</Checkbox>
        <Checkbox onChange={onCheck}>Kisumu</Checkbox>
        <Checkbox onChange={onCheck}>Ruiru</Checkbox>
      </Space>

      <Divider style={dividerStyle} />

      {/* Price Filter */}
      <SectionHeader title="Price Range" />
      <div style={{ padding: "0 12px 10px" }}>
        <Slider min={10000} max={100000} step={5000} marks={sliderMarks} />
      </div>

      <Divider style={dividerStyle} />

      {/* Property Type */}
      <SectionHeader
        title="Property Type"
        onClear={() => console.log("Clear property type")}
      />
      <Space direction="vertical" style={{ width: "100%", paddingLeft: 4 }}>
        <Checkbox onChange={onCheck}>For Sale</Checkbox>
        <Checkbox onChange={onCheck}>Office Space</Checkbox>
        <Checkbox onChange={onCheck}>Apartment/Airbnb</Checkbox>
        <Checkbox onChange={onCheck}>Townhouse</Checkbox>
      </Space>

      <Divider style={dividerStyle} />

      {/* Square Feet */}
      <SectionHeader title="Square Feet" />
      <div style={{ padding: "0 12px 10px" }}>
        <Slider min={1000} max={5000} step={100} />
      </div>
    </Card>
  );
}

export default FilterComponent;
