import { Carousel, Image } from "antd";

function ImageCarousel({ content, isMobile }) {
  return (
    <Carousel autoplay arrows dotPosition="bottom">
      {content.map((src, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: isMobile ? 260 : "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={`Property ${index + 1}`}
            preview={{
              mask: "Click to view full image",
            }}
            style={{
              width: "100%",
              height: isMobile ? 260 : 500,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
