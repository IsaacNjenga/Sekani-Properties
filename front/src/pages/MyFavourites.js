import { Col, Row, Skeleton, Empty } from "antd";
import "../assets/css/contact.css";
import PropertyCards from "../components/PropertyCards";
import { useFavourites } from "../contexts/FavouritesContext";
import { motion } from "framer-motion";

function MyFavourites() {
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
    <motion.div>
      <div style={{ background: "whitesmoke" }}>
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
    </motion.div>
  );
}

export default MyFavourites;
