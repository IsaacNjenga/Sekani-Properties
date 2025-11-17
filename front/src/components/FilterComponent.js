import {
  Button,
  Checkbox,
  Divider,
  Slider,
  Space,
  Typography,
  Card,
  Spin,
} from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "../contexts/UserContext";

const { Title } = Typography;

const dividerStyle = { margin: "8px 0", borderColor: "#e0e0e0" };

const checkStyle = { fontFamily: "Raleway" };

const priceMarks = {
  5000: {
    label: (
      <span
        style={{
          fontFamily: "Raleway",
        }}
      >
        KES 5,000
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
  500: {
    label: (
      <span
        style={{
          fontFamily: "Raleway",
        }}
      >
        500sqm
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

function FilterComponent({ realEstateData, setFilterApplied }) {
  const { setFilteredData, setFilterCriteria } = useUser();
  const [priceValue, setPriceValue] = useState(5000);
  const [location, setLocation] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [sizeValue, setSizeValue] = useState(500);
  const [filterLoading, setFilterLoading] = useState(false);

  const onCheck = (checked, value) => {
    setLocation((prev) =>
      checked ? [...prev, value] : prev.filter((loc) => loc !== value)
    );
  };
  const propertyCheck = (checked, value) => {
    setPropertyType((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const applyFilters = () => {
    setFilterApplied(true);
    setFilterLoading(true);
    setFilterCriteria({
      location: location,
      price: priceValue,
      propertyType: propertyType,
      size: sizeValue,
    });

    try {
      let filtered = realEstateData;

      // Filter by location
      if (location.length > 0) {
        filtered = filtered.filter((item) => location.includes(item.city));
      }

      // Filter by price
      filtered = filtered.filter((item) => item.price >= priceValue);

      // Filter by property type
      if (propertyType) {
        filtered = filtered.filter((item) =>
          propertyType.includes(item.propertyType)
        );
      }

      // Filter by size
      filtered = filtered.filter((item) => item.squareFeet >= sizeValue);

      //console.log("Filtered Results:", filtered);

      setFilteredData(filtered);

      return filtered;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setFilterLoading(false);
    }
  };

  return (
    <>
      {filterLoading && <Spin fullscreen tip="Just a sec..." />}
      <Card
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: 4,
        }}
      >
        <Title style={{ fontFamily: "Alegreya Sans", margin: 0, padding: 0 }}>
          Search
        </Title>

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
          {["Nairobi", "Mombasa", "Kisumu", "Ruiru"].map((loc) => (
            <Checkbox
              key={loc}
              checked={location.includes(loc)}
              onChange={(e) => onCheck(e.target.checked, loc)}
              style={checkStyle}
            >
              {loc}
            </Checkbox>
          ))}
        </Space>

        <Divider style={dividerStyle} />

        {/* Price Filter */}
        <SectionHeader title="Price Range" />
        <div style={{ padding: "0 12px 10px" }}>
          <Slider
            min={5000}
            max={100000}
            step={1000}
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
          {["For Sale", "Office Space", "Apartment", "Townhouse", "Land"].map(
            (type) => (
              <Checkbox
                key={type}
                checked={propertyType.includes(type)}
                onChange={(e) => propertyCheck(e.target.checked, type)}
                style={checkStyle}
              >
                {type}
              </Checkbox>
            )
          )}
        </Space>

        <Divider style={dividerStyle} />

        {/* Square Feet */}
        <SectionHeader title="Square Feet" />
        <div style={{ padding: "0 12px 10px" }}>
          <Slider
            min={500}
            max={5000}
            step={100}
            marks={sizeMarks}
            onChange={(value) => setSizeValue(value)}
          />
        </div>

        <div>
          <Button
            block
            onClick={applyFilters}
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
    </>
  );
}

export default FilterComponent;

// const dropDownItems = [
//   { key: 1, label: "Name (A-Z)" },
//   { key: 2, label: "Name (Z-A)" },
//   { key: 3, label: "Lowest price" },
//   { key: 4, label: "Highest price" },
//   { key: 5, label: "Property Type" },
//   { key: 6, label: "Year (Asc)" },
//   { key: 7, label: "Year (Desc)" },
// ];

//const menuProps = { items: dropDownItems, onClick: menuClickHandler };

//  <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: 8,
//         }}
//       >
//         <Title level={5} style={{ margin: 0, fontFamily: "Alegreya Sans" }}>
//           Sorting By:
//         </Title>
//         <Dropdown menu={menuProps}>
//           <Button
//             size="small"
//             style={{
//               background: "#f5f5f5",
//               borderRadius: 6,
//               border: "1px solid #d9d9d9",
//               display: "flex",
//               alignItems: "center",
//               gap: 4,
//               fontFamily: "Raleway",
//             }}
//           >
//             <span>{sort ? `Selected: ${sort}` : "Sort By"}</span>
//             <DownOutlined />
//           </Button>
//         </Dropdown>
//       </div>
