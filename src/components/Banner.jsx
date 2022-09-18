import React from "react";
import styled from "styled-components";

const BannerSec = styled.div`
  background: url("./images/banner.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  height: 50vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: -15rem;

  @media (max-width: 450px) {
    background-position: left;
  }

  .main__box {
    max-width: 60rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .content__box {
      padding: 2rem;

      @media (max-width: 450px) {
        font-size: 2rem;
        text-align: center;
      }
      h2 {
        font-size: 2.3rem;
        text-transform: capitalize;
        color: #fff;
        letter-spacing: 0.1rem;
      }

      h1 {
        font-size: 2.3rem;
        text-transform: capitalize;
        color: #fff;
        letter-spacing: 0.1rem;
      }
    }
  }
`;

function Banner() {
  return (
    <BannerSec>
      <div className="main__box">
        <div className="content__box">
          <h2> quality matters </h2>
          <h1> top most products available here </h1>
        </div>
      </div>
    </BannerSec>
  );
}

export default Banner;
