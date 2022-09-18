import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db, storage } from "../firebase";
import toast from "react-hot-toast";
import { uid } from "uid";

const RegisterDiv = styled.div`
  max-width: 500px;
  margin: 17rem auto 0;
  text-align: center;
  padding: 0 1.4rem;

  form {
    width: 100%;
    border: 0.1rem solid #444;
    padding: 3rem 2rem;

    input,
    .box {
      width: 100%;
      padding: 1rem 0.8rem;
      margin-bottom: 1rem;
      border: 0.1rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      outline: none;
      font-size: 1.6rem;
      font-weight: 500;
    }

    .btn {
      display: inline-block;
      margin-top: 1rem;
      padding: 1rem 2.7rem;
      background: #333;
      color: #fff;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      font-size: 1.6rem;
      text-transform: capitalize;
      margin-right: 1.5rem;
      cursor: pointer;
    }

    .link {
      font-size: 1.4rem;
      color: #222;
      text-transform: capitalize;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

function Register() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    if (admin.email !== "harryadmin@admin.com") {
      navigate("/");
    }
  }, [navigate, admin.email]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCatName, setProductCatName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleImg = (e) => {
    e.preventDefault();

    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
      } else {
        setProductImage(null);
        toast.error("Please Select a Valid Image");
      }
    } else {
      toast.error("Please select a image file");
    }
  };

  const handleAddproduct = (e) => {
    e.preventDefault();

    if (
      productName === "" ||
      productPrice === "" ||
      productDesc === "" ||
      productCatName === ""
    ) {
      toast.error("Fill All The Fields");
    } else {
      const storageRef = ref(
        storage,
        `product-images${productCatName.toUpperCase()}/${Date.now()}`
      );
      uploadBytes(storageRef, productImage)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              addDoc(collection(db, "products"), {
                productName,
                productPrice,
                productCatName,
                productDesc,
                productImage: url,
                productId: uid(12),
              }).then(() => {
                toast.success("Product added successfully");
                setProductName("");
                setProductDesc("");
                setProductPrice("");
                setProductCatName("");
              });
            })
            .catch((err) => toast.error(err.message));
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      {admin.email === "harryadmin@admin.com" ? (
        <>
          <RegisterDiv>
            <form onSubmit={handleAddproduct}>
              <h2 className="heading"> add product </h2>
              <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter product price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product category name"
                value={productCatName}
                onChange={(e) => setProductCatName(e.target.value)}
              />
              <input type="file" className="box" onChange={handleImg} />
              <textarea
                className="box"
                placeholder="peroduct description"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
              />
              <button type="submit" className="btn">
                add product
              </button>
            </form>
          </RegisterDiv>
        </>
      ) : (
        <h2
          className="warning"
          style={{
            marginTop: "15rem",
            textAlign: "center",
            fontSize: "2.5rem",
          }}
        >
          {" "}
          You Don't Have Access to add products !{" "}
        </h2>
      )}
    </>
  );
}

export default Register;
