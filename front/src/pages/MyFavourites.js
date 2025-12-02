import { Col, Row, Skeleton, Empty, Typography } from "antd";
import "../assets/css/contact.css";
import PropertyCards from "../components/PropertyCards";
import { HeartFilled } from "@ant-design/icons";
//import { useFavourites } from "../contexts/FavouritesContext";

const { Title, Text } = Typography;

function MyFavourites({ favouritesData }) {
  //const { liveFavouriteItems } = useFavourites();
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
    <div>
      <div style={{ marginBottom: 24, padding: "0 20px" }}>
        <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 8, }}>
          <span>My Favourites</span>
          <HeartFilled style={{ color: "red", marginLeft: 8 }} />
        </Title>
        <Text style={{ color: "#64748b", fontSize: 15 }}>
          View all the properties saved in your wishlist
        </Text>
      </div>

      <div style={{ background: "whitesmoke" }}>
        <div style={{ margin: "16px" }}>
          {favouritesData?.length === 0 ? (
            <Empty description="Seems like your wishlist is empty. Like some properties to save them for future reference" />
          ) : (
            <Row gutter={[24, 24]}>
              {favouritesData?.map((c) => (
                <Col key={c._id || c.key} xs={24} sm={12} md={6}>
                  <PropertyCards c={c} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyFavourites;
