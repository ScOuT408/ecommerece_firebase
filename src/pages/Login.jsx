import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      localStorage.getItem("user");
      navigate("/");
    }
  }, [navigate]);

  return (
    <RegisterDiv>
      <form>
        <h2 className="heading"> welcome back </h2>
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
        <button type="submit" className="btn" onClick={handleLogin}>
          login
        </button>
        <Link to="/register" className="link">
          don't have account?
        </Link>
      </form>
    </RegisterDiv>
  );
}

export default Register;
