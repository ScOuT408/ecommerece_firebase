import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import AddProduct from "./admin/AddProduct";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PgFOF from "./pages/PgFoF";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "7.5rem",
            fontSize: "1.7rem",
          },
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PgFOF />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
