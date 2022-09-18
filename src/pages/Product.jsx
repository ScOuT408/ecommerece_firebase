import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getProducts = () => {
      const productsArr = [];
      const path = "products";

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            productsArr.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArr);
        })
        .catch((err) => console.log(err.message));
    };
    getProducts();
  }, []);

  const user_id = JSON.parse(localStorage.getItem("user"));

  return (
    <section>
      <div className="product__filter">
        <div className="input__box">
          <input
            type="text"
            placeholder="search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="search" />
        </div>
        <div className="drop__down">
          <select
            className="lists"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">all</option>
            <option value="headphone"> headphone </option>
            <option value="watch"> watch </option>
          </select>
        </div>
      </div>
      <div className="product__gridbox">
        {products.length === 0 ? (
          <>
            <h2 className="alert"> No Products Available </h2>
          </>
        ) : (
          <>
            {filterType === "all" ? (
              <>
                {products.map((product, i) => (
                  <>
                    <ProductCard key={i} product={product} userId={user_id} />
                  </>
                ))}
              </>
            ) : (
              <>
                {products
                  .filter((obj) =>
                    obj.productName.toLowerCase().includes(search)
                  )
                  .filter((obj) => obj.productCatName.includes(filterType))
                  .map((product, index) => (
                    <React.Fragment key={index}>
                      <ProductCard
                        key={index}
                        product={product}
                        userId={user_id}
                      />
                    </React.Fragment>
                  ))}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Product;
