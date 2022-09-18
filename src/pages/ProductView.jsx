import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const ProductViewSec = styled.div`
  .main__box {
    margin-top: 15rem;
    margin-bottom: 5rem;
    max-width: 1200px;
    display: grid;

    .view__gridbox {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0 auto;

      @media (max-width: 665px) {
        grid-template-columns: 1fr;
        width: 95%;
        padding: 2rem;
        place-items: none;
      }

      @media (max-width: 400px) {
        padding: 0.6rem !important;
      }

      .img__box {
        width: 35rem;
        height: 35rem;
        background: #fff;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);

        @media (max-width: 400px) {
          width: 32rem;
          height: 32rem;

          img {
            object-fit: cover;
            height: 100%;
          }
        }

        img {
          object-fit: cover;
          height: 100%;
        }
      }

      .content {
        margin-top: 5rem;
        h2 {
          font-size: 3.5rem;
          text-transform: capitalize;
          letter-spacing: 0.1rem;
          margin-bottom: 0.7rem;
        }

        h4 {
          font-size: 2.3rem;
          text-transform: capitalize;
          letter-spacing: 0.1rem;
          color: #222;
          margin-bottom: 0.9rem;
        }

        .para {
          font-size: 1.8rem;
          max-width: 45rem;
          line-height: 1.5;
        }

        .button_div {
          max-width: 5rem;
          width: 100%;
          text-align: center;
          margin-top: 1.3rem;
          background: #222;
          display: inline-block;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 0.2rem solid #222;
          transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);

          &:hover {
            border: 0.2rem solid #222;
            background: transparent;

            .add_cart {
              color: #222 !important;
            }
          }

          .add_cart {
            color: #fff;
            font-size: 2rem;
          }
        }
      }
    }
  }
`;

function ProductView() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const productId = useParams();

  useEffect(() => {
    if (productId) {
      const getProductData = async () => {
        const q = query(
          collection(db, "products"),
          where("productId", "==", productId.id)
        );
        const data = await getDocs(q);
        setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getProductData();
    }
  }, [productId]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const radomUser = JSON.parse(localStorage.getItem("user"));

  const addToCart = (item) => {
    addDoc(collection(db, "cart"), {
      userId: radomUser.uid,
      productId: item.productId,
      prodName: item.productName,
      prodPrice: item.productPrice,
      prodImg: item.productImage,
      quantity: 1,
      prodCategory: item.productCatName,
    })
      .then(() => {
        toast.success("Product Added To The Cart");
        // window.location.reload();
      })
      .catch((err) => err && toast.error("Something Went Wrong"));
  };

  return (
    <ProductViewSec>
      <div className="main__box">
        {items.map((item) => (
          <div className="view__gridbox" key={item.id}>
            <div className="img__box">
              <img src={item.productImage} alt="img" />
            </div>
            <div className="content">
              <h2> {item.productName} </h2>
              <h4> Category Name: {item.productCatName} </h4>
              <div className="para">{item.productDesc}</div>
              <div className="button_div">
                <ShoppingCartOutlinedIcon
                  className="add_cart"
                  onClick={() => addToCart(item)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProductViewSec>
  );
}

export default ProductView;
