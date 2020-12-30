import React from "react";
import style from "./Iphone.module.css";
import classNames from "classnames";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
// import Image1 from "../../assets/accounts/leftcont1.jpg";
// import Image2 from "../../assets/accounts/leftcont2.jpg";
// import Image3 from "../../assets/accounts/leftcont3.jpg";
// import Image4 from "../../assets/accounts/leftcont4.jpg";
// import Image5 from "../../assets/accounts/leftcont5.jpg";

function Iphone({ className }) {
  return (
    <div className={classNames(style.phoneBox, className)}>
      {/* <Swiper
        style={{ height: "380px" }}
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
      >
        <SwiperSlide>
          <img src={Image1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image5} alt="" />
        </SwiperSlide>
      </Swiper> */}
    </div>
  );
}

export default Iphone;
