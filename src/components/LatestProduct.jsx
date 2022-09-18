import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function LatestProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), limit(3));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];
      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArr);
    });
    return () => {
      unsub();
    };
  }, []);

  const radomUser = JSON.parse(localStorage.getItem("user"));

  const addToCart = (product) => {
    addDoc(collection(db, "cart"), {
      userId: radomUser.uid,
      productId: product.productId,
      prodName: product.productName,
      prodPrice: product.productPrice,
      prodImg: product.productImage,
      quantity: 1,
      prodCategory: product.productCatName,
    })
      .then(() => {
        toast.success("Product Added To The Cart");
        // window.location.reload();
      })
      .catch((err) => err && toast.error("Something Went Wrong"));
  };

  return (
    <div className="latest_products">
      <h2 className="heading"> latest products </h2>
      <div className="product__gridbox">
        {products.length === 0 ? (
          <>
            <h2 className="alert">no products available</h2>
          </>
        ) : (
          <>
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <div className="product__box">
                  <div className="img__box">
                    <img src={product.productImage} alt="" />
                  </div>
                  <div className="content">
                    <div className="first_box">
                      <h3> {product.productName} </h3>
                      <h3> {product.productPrice}/- </h3>
                    </div>

                    <div className="second_box">
                      <Link
                        to={`/product/${product.productId}`}
                        style={{ color: "#222" }}
                      >
                        <VisibilityIcon className="p_icon" />
                      </Link>
                      <ShoppingCartOutlinedIcon
                        className="p_icon"
                        onClick={() => addToCart(product)}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default LatestProduct;
