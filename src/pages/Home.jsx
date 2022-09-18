import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Service from "../components/Service";
import Gallery from "../components/Gallery";
import Banner from "../components/Banner";
import LatestProduct from "../components/LatestProduct";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <div className="img__box">
            <img src="./images/home-1.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img__box">
            <img src="./images/home-2.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img__box">
            <img src="./images/home-3.jpg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
      <Service />
      <LatestProduct />
      <Gallery />
      <Banner />
    </>
  );
}

export default Home;
