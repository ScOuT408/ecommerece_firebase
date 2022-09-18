import React from "react";
import styled from "styled-components";

const GallerySec = styled.div`
  max-width: 1200px;
  display: grid;
  margin: 10rem auto;
  gap: 1.4rem;
  padding: 0 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .card {
    border-radius: 0.5rem;
    width: 100% !important;

    &:nth-child(1) {
      grid-column: 1/ 3;

      @media (max-width: 768px) {
        grid-column: 1;
      }

      .img__box {
        height: 100% !important;
      }
    }

    &:nth-child(2) {
      .img__box {
        height: 100% !important;
      }
    }

    &:nth-child(4) {
      grid-column: 2 / 4;
      grid-row: 2;

      @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 4;

        .img__box {
          height: 100% !important;
        }
      }
    }

    &:nth-child(5) {
      grid-column: 4;
      grid-row: 1 / 3;
      .img__box {
        height: 80.5% !important;
      }

      @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 5;

        .img__box {
          height: 80.5% !important;
        }
      }
    }

    .img__box {
      height: 60%;
      width: 100%;
      padding: 1rem 1rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);

      @media (max-width: 768px) {
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

function Gallery() {
  return (
    <GallerySec>
      <div className="card">
        <div className="img__box">
          <img
            src="https://images.unsplash.com/photo-1663174494200-7802f72775ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </div>
      </div>
      <div className="card">
        <div className="img__box">
          <img
            src="https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </div>
      </div>
      <div className="card">
        <div className="img__box">
          <img
            src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            alt=""
          />
        </div>
      </div>
      <div className="card">
        <div className="img__box">
          <img
            src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </div>
      </div>
      <div className="card">
        <div className="img__box">
          <img
            src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=365&q=80"
            alt=""
          />
        </div>
      </div>
    </GallerySec>
  );
}

export default Gallery;
