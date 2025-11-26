import { useEffect, useMemo, useState, useCallback } from "react";
import Motion from "../components/Motion";
import {
  Typography,
  Image,
  Input,
  Row,
  Col,
  Button,
  Tag,
  Skeleton,
} from "antd";
import PropertyModal from "../components/PropertyModal.js";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/images/propertyBg.jpeg";
import FilterComponent from "../components/FilterComponent.js";
import emptyStreet from "../assets/images/empty_street.png";
import useFetchAllProperties from "../hooks/fetchAllProperties.js";
import PropertyCards from "../components/PropertyCards.js";
//import PropertyCard from "../components/PropertyCard.js";
import debounce from "lodash.debounce";
import { useUser } from "../contexts/UserContext/index.js";
//import {RealEstateData } from '../assets/data/mockData.js';

const { Title } = Typography;
const { Search } = Input;

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "#fff",
  padding: "0 20px",
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Bodoni Moda",
  textAlign: "center",
  fontWeight: 400,
  letterSpacing: 2,
  fontSize: 38,
};

const tagStyle = {
  borderRadius: 18,
  padding: "4px 12px",
  fontFamily: "Raleway",
  fontWeight: 600,
  fontSize: 16,
  margin: 5,
  cursor: "pointer",
};

const tagsData = ["For Sale", "Airbnb", "For Rent", "Commercial", "Land"];

function Properties() {
  const navigate = useNavigate();
  //const properties = RealEstateData;
  const { properties, propertiesLoading, handleLoadMore, propertiesRefresh } =
    useFetchAllProperties();

  const { isMobile, filteredData, setFilteredData } = useUser();

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

  // ---------- memoized derived data ----------
  const filteredProperties = useMemo(() => {
    // start from the server-fetched properties
    let data = Array.isArray(properties) ? properties : [];

    // apply tag filters first (fast)
    if (selectedTags.length > 0) {
      const tagsSet = new Set(selectedTags);
      data = data.filter((p) => tagsSet.has(p.listingType));
    }

    // apply global filter component result (if applied)
    if (
      filterApplied &&
      Array.isArray(filteredData) &&
      filteredData.length > 0
    ) {
      data = filteredData;
    }

    // apply search last (string matching across string fields)
    if (searchValue && searchValue.trim().length > 0) {
      const value = searchValue.toLowerCase();
      data = data.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(value)
        )
      );
    }

    return data;
  }, [properties, selectedTags, searchValue, filterApplied, filteredData]);

  // ---------- handlers (memoized) ----------
  const handleCheck = useCallback(
    (tag, checked) => {
      setSelectedTags((prev) => {
        const next = checked ? [...prev, tag] : prev.filter((t) => t !== tag);
        return next;
      });
    },
    [setSelectedTags]
  );

  // debounced search — updates state only after user pauses typing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((val) => {
      setSearchValue(val);
    }, 350),
    []
  );

  const onSearchChange = useCallback(
    (e) => {
      const val = (e.target.value || "").toLowerCase().trim();
      // immediate UI feedback can be added (e.g., loading spinner), but keep search state debounced
      debouncedSetSearch(val);
    },
    [debouncedSetSearch]
  );

  const viewProperty = useCallback((property) => {
    setLoading(true);
    setContent(property);
    setOpenModal(true);
    // quick UX delay for spinner effect (keeps behaviour consistent)
    setTimeout(() => setLoading(false), 120);
  }, []);

  const clearTag = useCallback(
    (tag) => {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    },
    [setSelectedTags]
  );

  // Remove filters from FilterComponent
  const handleRemoveFilters = useCallback(() => {
    setFilteredData([]);
    setFilterApplied(false);
  }, [setFilteredData]);

  // ---------- effects ----------
  // when the FilterComponent toggles filterApplied it should set the flag from that component
  useEffect(() => {
    // ensure filterApplied follows presence of filteredData
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [filteredData]);

  // ---------- render helpers ----------
  const renderPropertyGrid = () => {
    if (propertiesLoading) {
      // show skeletons in grid
      return (
        <Row gutter={[32, 32]}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8}>
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            </Col>
          ))}
        </Row>
      );
    }

    if (!filteredProperties || filteredProperties.length === 0) {
      // show empty state
      return (
        <div
          style={{
            background: "#eae4ac81",
            borderRadius: 12,
            padding: 20,
            textAlign: "center",
          }}
        >
          <Title level={4} style={{ fontFamily: "Raleway", marginBottom: 8 }}>
            No results found
          </Title>
          <p style={{ marginTop: 0 }}>
            Sorry, we did not find the term you are looking for. Reach out to us{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => navigate("/contact")}
            >
              here
            </span>{" "}
            for any inquiries
          </p>

          <Image
            src={emptyStreet}
            alt="empty"
            preview={false}
            style={{ maxWidth: "600px", width: "100%", marginTop: 12 }}
          />
        </div>
      );
    }

    return (
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={6}>
          <FilterComponent
            realEstateData={properties}
            setFilterApplied={setFilterApplied}
          />
        </Col>

        <Col xs={24} sm={12} md={18}>
          {filterApplied && filteredData.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <Button danger type="primary" onClick={handleRemoveFilters}>
                Remove filters
              </Button>
            </div>
          )}

          <Row gutter={[24, 24]}>
            {filteredProperties.map((c) => (
              <Col key={c._id || c.key} xs={24} sm={12} md={8}>
                <PropertyCards c={c} viewProperty={viewProperty} />
              </Col>
            ))}
          </Row>

          {/* Load more button for pagination */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Button
              type="primary"
              onClick={() => handleLoadMore()}
              loading={propertiesLoading}
              style={{
                background: "linear-gradient(135deg, #b0aa94, #b0aa94)",
                borderRadius: 10,
                padding: "2px 16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                fontFamily: "Raleway",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(102, 126, 234, 0.3)";
              }}
            >
              Load more
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Motion>
      <div style={{ background: "whitesmoke" }}>
        {/* banner */}
        <div style={{ position: "relative" }}>
          <Image
            src={bgImg}
            alt="bgImg"
            width="100%"
            height={isMobile ? 450 : 500}
            preview={false}
            style={{ objectFit: "cover", maxWidth: "100%" }}
          />
          <div style={{ ...heroStyle }}>
            <Title
              level={3}
              style={{ ...titleStyle, fontSize: isMobile ? 34 : 38 }}
            >
              FIND YOUR PERFECT FIT
            </Title>
            <div style={{ marginTop: 12 }}>
              <Search
                placeholder="Search by location, listing type..."
                size="large"
                loading={loading}
                enterButton
                onChange={onSearchChange}
                allowClear
                style={{ width: isMobile ? 350 : 600, height: 50 }}
              />
            </div>
          </div>
        </div>

        {/* tags */}
        <div style={{ margin: 10, padding: 15 }}>
          {tagsData.map((tag) => {
            const isChecked = selectedTags?.includes(tag);
            return (
              <Tag.CheckableTag
                key={tag}
                checked={isChecked}
                onChange={(checked) => handleCheck(tag, checked)}
                style={{
                  ...tagStyle,
                  color: isChecked ? "#fff" : "#333",
                  backgroundColor: isChecked ? "#8d8009ff" : "transparent",
                  border: isChecked
                    ? "1px solid transparent"
                    : "1px solid #333",
                }}
              >
                {tag}
                {isChecked && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      clearTag(tag);
                    }}
                    style={{
                      marginLeft: 6,
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    <CloseOutlined />
                  </span>
                )}
              </Tag.CheckableTag>
            );
          })}
        </div>

        {/* body */}
        <div style={{ margin: "10px 32px" }}>
          {searchValue && (
            <div style={{ marginBottom: 20, marginTop: 0 }}>
              <Title style={{ fontFamily: "Alegreya Sans" }}>
                Results for "{searchValue}"
              </Title>
            </div>
          )}

          {renderPropertyGrid()}
        </div>
      </div>

      <PropertyModal
        content={content}
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={loading}
        propertiesRefresh={propertiesRefresh}
      />
    </Motion>
  );
}

export default Properties;
