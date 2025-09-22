import {
  Button,
  Checkbox,
  Divider,
  Slider,
  Space,
  Typography,
  Card,
} from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const dividerStyle = { margin: "8px 0", borderColor: "#e0e0e0" };

const checkStyle = { fontFamily: "Raleway" };

const dropDownItems = [
  { key: 1, label: "Name (A-Z)" },
  { key: 2, label: "Name (Z-A)" },
  { key: 3, label: "Lowest price" },
  { key: 4, label: "Highest price" },
  { key: 5, label: "Property Type" },
  { key: 6, label: "Year (Asc)" },
  { key: 7, label: "Year (Desc)" },
];

const priceMarks = {
  10000: {
    label: (
      <span
        style={{
          fontFamily: "Raleway",
        }}
      >
        KES 10,000
      </span>
    ),
  },
  100000: {
    style: { color: "#f50" },
    label: (
      <strong
        style={{
          fontFamily: "Raleway",
        }}
      >
        KES 100,000
      </strong>
    ),
  },
};

const sizeMarks = {
  1000: {
    label: (
      <span
        style={{
          fontFamily: "Raleway",
        }}
      >
        1000sqm
      </span>
    ),
  },
  5000: {
    style: { color: "#f50" },
    label: (
      <strong
        style={{
          fontFamily: "Raleway",
        }}
      >
        5000sqm
      </strong>
    ),
  },
};

function FilterComponent() {
  //const [sort, setSort] = useState("");
  const [priceValue, setPriceValue] = useState(10000);
  const [location, setLocation] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [sizeValue, setSizeValue] = useState(1000);

  const menuClickHandler = (e) => {
    //setSort(e.key);
  };

  const menuProps = { items: dropDownItems, onClick: menuClickHandler };

  const onCheck = ({ e, name, value }) => {
    //console.log(`checked = ${e.target.checked}`);
    //  if (e.target.checked) {
    setLocation((prev) => [...prev, { name: name, value: value }]);
    //}
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
      <Title level={5} style={{ margin: 0, fontFamily: "Alegreya Sans" }}>
        {title}
      </Title>
      {onClear && (
        <Button
          type="link"
          size="small"
          onClick={onClear}
          style={{ padding: 0, color: "#1890ff", fontFamily: "Alegreya Sans" }}
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
        padding: 4,
      }}
    >
      {/* Sort Section */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Title level={5} style={{ margin: 0, fontFamily: "Alegreya Sans" }}>
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
              fontFamily: "Raleway",
            }}
          >
            <span>{sort ? `Selected: ${sort}` : "Sort By"}</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </div> */}

      <Divider style={dividerStyle} />

      {/* Locations Filter */}
      <SectionHeader
        title="Locations"
        onClear={() => {
          console.log("Clear locations");
          setLocation([]);
        }}
      />
      <Space direction="vertical" style={{ width: "100%", paddingLeft: 4 }}>
        <Checkbox
          onChange={() => onCheck({ name: "Nairobi", value: "Nairobi" })}
          style={checkStyle}
        >
          Nairobi
        </Checkbox>
        <Checkbox
          onChange={() => onCheck({ name: "Mombasa", value: "Mombasa" })}
          style={checkStyle}
        >
          Mombasa
        </Checkbox>
        <Checkbox
          onChange={() => onCheck({ name: "Kisumu", value: "Kisumu" })}
          style={checkStyle}
        >
          Kisumu
        </Checkbox>
        <Checkbox
          onChange={() => onCheck({ name: "Ruiru", value: "Ruiru" })}
          style={checkStyle}
        >
          Ruiru
        </Checkbox>
      </Space>

      <Divider style={dividerStyle} />

      {/* Price Filter */}
      <SectionHeader title="Price Range" />
      <div style={{ padding: "0 12px 10px" }}>
        <Slider
          min={10000}
          max={100000}
          step={5000}
          marks={priceMarks}
          onChange={(value) => setPriceValue(value)}
        />
      </div>

      <Divider style={dividerStyle} />

      {/* Property Type */}
      <SectionHeader
        title="Property Type"
        onClear={() => {
          console.log("Clear property type");
          setPropertyType("");
        }}
      />
      <Space direction="vertical" style={{ width: "100%", paddingLeft: 4 }}>
        <Checkbox
          onChange={() => onCheck({ name: "For Sale", value: "For Sale" })}
          style={checkStyle}
        >
          For Sale
        </Checkbox>
        <Checkbox
          onChange={() =>
            onCheck({ name: "Office Space", value: "Office Space" })
          }
          style={checkStyle}
        >
          Office Space
        </Checkbox>
        <Checkbox
          onChange={() => onCheck({ name: "Apartment", value: "Apartment" })}
          style={checkStyle}
        >
          Apartment/Airbnb
        </Checkbox>
        <Checkbox
          onChange={() => onCheck({ name: "Townhouse", value: "Townhouse" })}
          style={checkStyle}
        >
          Townhouse
        </Checkbox>
      </Space>

      <Divider style={dividerStyle} />

      {/* Square Feet */}
      <SectionHeader title="Square Feet" />
      <div style={{ padding: "0 12px 10px" }}>
        <Slider
          min={1000}
          max={5000}
          step={100}
          marks={sizeMarks}
          onChange={(value) => setSizeValue(value)}
        />
      </div>

      <div>
        <Button
          block
          style={{
            borderRadius: 0,
            background: "#f0ebd4",
            color: "#333",
            fontFamily: "Alegreya Sans",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}

export default FilterComponent;
