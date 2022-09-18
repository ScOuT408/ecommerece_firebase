import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

function ProductCard({ product, userId }) {
  const addToCart = () => {
    // const isItemInCart = async () => {
    //   const q = query(
    //     collection(db, "cart"),
    //     where("productId", "==", productId)
    //   );
    //   const snapshot = await getDocs(q);
    //   const results = snapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   results.forEach(async (result) => {
    //     if (result.id) {
    //       console.log("can't");
    //     }
    //   });
    // };
    // isItemInCart();

    addDoc(collection(db, "cart"), {
      userId: userId.uid,
      productId: product.productId,
      prodName: product.productName,
      prodImg: product.productImage,
      prodPrice: product.productPrice,
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
    <React.Fragment key={product.id}>
      <div className="product__box">
        <div className="img__box">
          <img src={product.productImage} alt="img" />
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
            <ShoppingCartOutlinedIcon className="p_icon" onClick={addToCart} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductCard;
