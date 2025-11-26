import Motion from "../components/Motion";
import { Col, Image, Row, Skeleton, Typography, Empty } from "antd";
import "../assets/css/contact.css";
import SplitText from "../components/SplitText";
import { useUser } from "../contexts/UserContext";
import PropertyCards from "../components/PropertyCards";
import { useFavourites } from "../contexts/FavouritesContext";

const { Title, Paragraph } = Typography;

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.25))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "0 20px",
  color: "#fff",
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Bodoni Moda",
  fontWeight: 600,
  letterSpacing: 2,
  fontSize: 42,
};

const subTitleStyle = {
  marginTop: 5,
  color: "#fff",
  fontFamily: "Alegreya Sans",
  fontWeight: 400,
  fontSize: 26,
  maxWidth: 600,
};

function Favourites() {
  const { isMobile } = useUser();
  const { liveFavouriteItems } = useFavourites();
  const propertiesLoading = false;

  if (propertiesLoading) {
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

  return (
    <Motion>
      <div style={{ background: "whitesmoke" }}>
        {/* Hero Section */}
        <div style={{ position: "relative" }}>
          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1661679385591-d51b10ebf581?w=900"
            }
            alt="bgImg"
            loading="lazy"
            width="100%"
            height={isMobile ? 600 : 500}
            preview={false}
            style={{ objectFit: "cover", maxWidth: "100%" }}
          />
          <div style={heroStyle}>
            <SplitText
              text={
                <Title
                  style={{ ...titleStyle, fontSize: isMobile ? 34 : 42 }}
                  level={1}
                >
                  Your Favourites
                </Title>
              }
              delay={100}
              duration={0.2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <Paragraph style={subTitleStyle}>
              See all the properties you liked.
            </Paragraph>
          </div>
        </div>

        <div style={{ margin: "20px 32px" }}>
          {liveFavouriteItems?.length === 0 ? (
            <Empty description="Seems like your wishlist is empty. Like some properties to save them for future reference" />
          ) : (
            <Row gutter={[24, 24]}>
              {liveFavouriteItems?.map((c) => (
                <Col key={c._id || c.key} xs={24} sm={12} md={6}>
                  <PropertyCards c={c} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </Motion>
  );
}

export default Favourites;
