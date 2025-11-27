import Motion from "../components/Motion";
import { Card, Image, Typography } from "antd";
import "../assets/css/contact.css";
import SplitText from "../components/SplitText";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import MyFavourites from '../pages/MyFavourites'; 
import MyReviews from '../pages/MyReviews'; 

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
  maxWidth: 800,
};

const tabListNoTitle = [
  {
    key: "favourites",
    label: "My Favourites",
  },
  {
    key: "reviews",
    label: "My Reviews",
  },
];

const contentListNoTitle = {
  favourites: <MyFavourites />,
  reviews: <MyReviews />,
};

function UserPage() {
  const { isMobile } = useUser();
  const [activeTabKey2, setActiveTabKey2] = useState("favourites");

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  return (
    <Motion>
      <div style={{ background: "whitesmoke" ,minHeight:'100vh'}}>
        {/* Hero Section */}
        <div style={{ position: "relative" }}>
          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1681412205156-bb506a4ea970?w=900"
            }
            alt="bgImg"
            loading="lazy"
            width="100%"
            height={isMobile ? 600 : 600}
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
                  My Account
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
              View your favourites and reviews here. If you have any questions
              or need any help, contact us at support@sekani.com.
            </Paragraph>
          </div>
        </div>

        {/* body */}
        <div>
          <Card 
            centered
            style={{ width: "100%" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={onTab2Change}
            tabProps={{
              size: "middle",
            }}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        </div>
      </div>
    </Motion>
  );
}

export default UserPage;
