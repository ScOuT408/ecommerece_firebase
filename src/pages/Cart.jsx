import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase";
import { mobile } from "../responsive";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const Container = styled.div`
  margin-top: 10rem;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 560;
  font-size: 2rem;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

  span {
    .delete {
      font-size: 3rem;
      margin-left: 3rem;
      color: crimson;
      cursor: pointer;
    }
  }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 150px;

  @media (max-width: 650px) {
    width: 100px;
  }
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-size: 1.5rem;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .qty_btn {
    cursor: pointer;
    font-size: 2rem;
  }
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 550;
  font-size: 1.8rem;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  font-weight: 550;
  font-size: 1.5rem;
`;

const SummaryItemPrice = styled.span`
  font-weight: 550;
  font-size: 2rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const radomUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getCartData = async () => {
      const q = query(
        collection(db, "cart"),
        where("userId", "==", radomUser.uid)
      );
      onSnapshot(q, (snapshot) => {
        let allCartData = [];
        snapshot.docs.forEach((doc) => {
          allCartData.push({ ...doc.data(), id: doc.id });
        });
        setCartData(allCartData);
      });
    };
    getCartData();
  }, [radomUser.uid]);

  const increase = async (quantity, id) => {
    const docRef = doc(db, "cart", id);
    try {
      await updateDoc(docRef, {
        quantity: quantity + 1,
      }).then(() => console.log("updated"));
    } catch (err) {
      console.log(err.message);
    }
  };

  const decrease = async (quantity, id) => {
    const docRef = doc(db, "cart", id);
    try {
      await updateDoc(docRef, {
        quantity: quantity - 1,
      }).then(() => console.log("updated"));
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteCart = (id) => {
    const docRef = doc(db, "cart", id);
    deleteDoc(docRef).then(() => {
      toast.success("Cart Item Removed !");
    });
  };

  function total() {
    let x = 0;
    // eslint-disable-next-line
    cartData.map((totalP) => {
      x += totalP.prodPrice * totalP.quantity;
    });
    return x;
  }

  const placeOrder = () => {
    if (cartData.length === 0) {
      toast.error("Add Some Items First");
    } else {
      toast.success("Order Placed Successfully");
      deleteWholeCart();
      navigate("/");
    }
  };

  const deleteWholeCart = async () => {
    const q = query(
      collection(db, "cart"),
      where("userId", "==", radomUser.uid)
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    results.forEach(async (result) => {
      const docRef = doc(db, "cart", result.id);
      await deleteDoc(docRef);
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/product">
            <TopButton>CONTINUE SHOPPING</TopButton>{" "}
          </Link>
        </Top>
        <Bottom>
          <Info>
            {cartData.length === 0 ? (
              <>
                <h2 className="cart_text"> cart is empty now </h2>
              </>
            ) : (
              <>
                {cartData.map(
                  ({ prodImg, prodName, prodPrice, quantity, id }) => (
                    <React.Fragment key={id}>
                      <Product>
                        <ProductDetail>
                          <Image src={prodImg} />
                          <Details>
                            <ProductName> {prodName} </ProductName>
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            <AddIcon
                              className="qty_btn"
                              onClick={() => increase(quantity, id)}
                            />
                            <ProductAmount>{quantity}</ProductAmount>
                            <RemoveIcon
                              className="qty_btn"
                              onClick={() => decrease(quantity, id)}
                            />
                            <span>
                              {" "}
                              <DeleteIcon
                                className="delete"
                                onClick={() => deleteCart(id)}
                              />
                            </span>
                          </ProductAmountContainer>
                          <ProductPrice>{prodPrice * quantity} /-</ProductPrice>
                        </PriceDetail>
                      </Product>
                    </React.Fragment>
                  )
                )}
              </>
            )}
            <Hr />
            <br />
            <br />
            <br />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{total().toLocaleString()}/-</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{total().toLocaleString()}/-</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={placeOrder}>PLACE ORDER</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
