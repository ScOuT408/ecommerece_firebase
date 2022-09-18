import React from "react";

function Footer() {
  return (
    <>
      <section className="footer" id="footer">
        <div className="box-container">
          <div className="box">
            <a href="/#" className="logo">
              ecom
            </a>
            <p>
              The customer is at the heart of our unique business model, which
              includes design
            </p>
            <img src="../images/payment.png" alt="" className="payment" />
          </div>

          <div className="box">
            <h3>NEWLETTER</h3>
            <p>
              Be the first to know about new arrivals, look books, sales &
              promos!
            </p>
            <form>
              <input type="mail" placeholder="your mail" />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
