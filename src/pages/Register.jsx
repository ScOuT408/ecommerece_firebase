import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const RegisterDiv = styled.div`
  max-width: 500px;
  margin: 17rem auto 0;
  text-align: center;
  padding: 0 1.4rem;

  form {
    width: 100%;
    border: 0.1rem solid #444;
    padding: 3rem 2rem;

    input {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let cartValue = 0;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        addDoc(collection(db, "users"), {
          username: name,
          email: email,
          uid: user.uid,
          cart: cartValue,
        });
      }
      toast.success("Registration Done !");
      setTimeout(() => {
        navigate("/login");
      }, 2200);
    } catch (err) {
      if (err.message == "Firebase: Error (auth/invalid-email).") {
        toast.error("Please fill all required fields");
      }
      if (
        err.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        toast.error("Password Should 6 characters !");
      }
      if (err.message == "Firebase: Error (auth/email-already-in-use).") {
        toast.error("User already exists");
      }
    }
  };
  return (
    <RegisterDiv>
      <form>
        <h2 className="heading"> join us </h2>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        <button type="submit" className="btn" onClick={handleSubmit}>
          register
        </button>
        <Link to="/login" className="link">
          {" "}
          already an account?{" "}
        </Link>
      </form>
    </RegisterDiv>
  );
}

export default Register;
