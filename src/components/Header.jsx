import React, { useEffect, useState } from "react";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Header() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    signOut(auth);
    navigate("/login");
    window.location.reload();
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userIn) => {
  //     if (userIn) {
  //       const getUsers = async () => {
  //         const q = query(
  //           collection(db, "users"),
  //           where("uid", "==", userIn.uid)
  //         );
  //         const data = await getDocs(q);
  //         setNewUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //       };
  //       getUsers();
  //     } else {
  //       setNewUser(null);
  //     }
  //   });
  // }, []);

  const radomUser = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   if (radomUser) {
  //     const getCart = () => {
  //       const q = query(
  //         collection(db, "cart"),
  //         where("userId", "==", radomUser.uid)
  //       );
  //       onSnapshot(q, (snapshot) => {
  //         setCount(snapshot.docs.map((doc) => doc.data()));
  //       });
  //     };
  //     getCart();
  //   }
  // }, [radomUser]);

  useEffect(() => {
    if (radomUser) {
      const getCart = () => {
        const cartArray = [];
        const q = query(
          collection(db, "cart"),
          where("userId", "==", radomUser.uid)
        );
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCount(cartArray);
          // console.log('done')
        });
      };
      getCart();
    }
  }, [radomUser]);

  return (
    <header className="header">
      <div className="flex">
        <Link to="/" className="logo">
          <WhatshotOutlinedIcon className="fire" />
          ecom.
        </Link>

        <nav className={open ? "navbar active" : "navbar"}>
          {user ? (
            <>
              <Link to="/" className="links">
                home
              </Link>
              <Link to="/product" className="links">
                Products
              </Link>
              {radomUser.email === "harryadmin@admin.com" && (
                <Link to="/addproduct" className="links">
                  Add Product
                </Link>
              )}
              <span className="links" style={{ textTransform: "lowercase" }}>
                logged in as: {user.email}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="form_btn">
                Login
              </Link>
              <Link to="/register" className="form_btn">
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="icons">
          <Link to="/cart">
            <ShoppingCartOutlinedIcon
              className="icon"
              style={{ color: "#333" }}
            />
          </Link>
          <h2> ({count.length}) </h2>
          {user ? (
            <LogoutIcon className="icon" onClick={handleLogout} />
          ) : (
            <PersonOutlineIcon className="icon" />
          )}
          {open ? (
            <CloseIcon className="icon" onClick={() => setOpen(!open)} />
          ) : (
            <MenuIcon className="icon" onClick={() => setOpen(!open)} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
